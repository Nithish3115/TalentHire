package com.jobfair.controller;

import com.jobfair.model.Application;
import com.jobfair.model.Job;
import com.jobfair.repository.ApplicationRepository;
import com.jobfair.repository.JobRepository;
import com.jobfair.repository.StudentRepository;
import com.jobfair.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    JobRepository jobRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> applyToJob(@RequestBody Map<String, Long> payload, Authentication auth) {
        Long jobId = payload.get("jobId");
        if (jobId == null) {
            return ResponseEntity.badRequest().body("jobId is required.");
        }

        Long userId = userRepository.findByEmail(auth.getName()).get().getId();
        if (jobRepository.findById(jobId).isEmpty()) {
            return ResponseEntity.badRequest().body("Job not found.");
        }
        if (studentRepository.findById(userId).isEmpty()) {
            return ResponseEntity.badRequest().body("Student profile not found.");
        }

        if (applicationRepository.existsByJobIdAndStudentId(jobId, userId)) {
            return ResponseEntity.badRequest().body("Already applied to this job.");
        }

        Application app = new Application();
        app.setJobId(jobId);
        app.setStudentId(userId);
        app.setStatus("PENDING");

        return ResponseEntity.ok(applicationRepository.save(app));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getMyApplications(Authentication auth) {
        Long userId = userRepository.findByEmail(auth.getName()).get().getId();
        return ResponseEntity.ok(applicationRepository.findByStudentId(userId));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> getApplicantsForJob(@PathVariable Long jobId, Authentication auth) {
        Long userId = userRepository.findByEmail(auth.getName()).get().getId();

        Optional<Job> job = jobRepository.findById(jobId);
        if (job.isEmpty() || !job.get().getRecruiterId().equals(userId)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        return ResponseEntity.ok(applicationRepository.findByJobId(jobId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap,
            Authentication auth) {
        Long userId = userRepository.findByEmail(auth.getName()).get().getId();
        String newStatus = statusMap.get("status");
        Set<String> allowedStatuses = Set.of("PENDING", "ACCEPTED", "REJECTED");

        if (newStatus == null || !allowedStatuses.contains(newStatus.toUpperCase())) {
            return ResponseEntity.badRequest().body("Invalid status. Allowed values: PENDING, ACCEPTED, REJECTED");
        }

        return applicationRepository.findById(id).map(app -> {
            Optional<Job> job = jobRepository.findById(app.getJobId());
            if (job.isEmpty() || !job.get().getRecruiterId().equals(userId)) {
                return ResponseEntity.status(403).body("Unauthorized");
            }
            app.setStatus(newStatus.toUpperCase());
            return ResponseEntity.ok((Object) applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }
}
