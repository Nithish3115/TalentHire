package com.jobfair.controller;

import com.jobfair.model.Job;
import com.jobfair.model.Recruiter;
import com.jobfair.model.Application;
import com.jobfair.repository.ApplicationRepository;
import com.jobfair.repository.JobRepository;
import com.jobfair.repository.RecruiterRepository;
import com.jobfair.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    JobRepository jobRepository;

    @Autowired
    RecruiterRepository recruiterRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @GetMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('RECRUITER')")
    public List<Job> getAllJobs(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return jobRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
        }
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('RECRUITER')")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('STUDENT') or hasRole('RECRUITER')")
    public List<Job> searchJobs(@RequestParam(required = false) String q) {
        if (q == null || q.isBlank()) {
            return jobRepository.findAll();
        }
        return jobRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
    }

    @GetMapping("/recruiter/my")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<Job> getMyJobs(Authentication auth) {
        Long userId = getUserIdFromAuth(auth);
        return jobRepository.findByRecruiterId(userId);
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> createJob(@Valid @RequestBody Job job, Authentication auth) {
        // Assume auth principal username is email
        Long userId = getUserIdFromAuth(auth);
        Optional<Recruiter> recruiter = recruiterRepository.findById(userId);
        if (recruiter.isEmpty())
            return ResponseEntity.badRequest().body("Recruiter not found");

        job.setRecruiterId(recruiter.get().getUserId());
        return ResponseEntity.ok(jobRepository.save(job));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @Valid @RequestBody Job jobDetails, Authentication auth) {
        Long userId = getUserIdFromAuth(auth);

        return jobRepository.findById(id).map(job -> {
            if (!job.getRecruiterId().equals(userId)) {
                return ResponseEntity.status(403).body("Unauthorized to edit this job");
            }
            job.setTitle(jobDetails.getTitle());
            job.setDescription(jobDetails.getDescription());
            job.setLocation(jobDetails.getLocation());
            job.setSalary(jobDetails.getSalary());
            return ResponseEntity.ok((Object) jobRepository.save(job));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id, Authentication auth) {
        Long userId = getUserIdFromAuth(auth);
        return jobRepository.findById(id).map(job -> {
            if (!job.getRecruiterId().equals(userId)) {
                return ResponseEntity.status(403).body("Unauthorized to delete this job");
            }
            jobRepository.delete(job);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> applyToJobByPath(@PathVariable Long id, Authentication auth) {
        Long userId = getUserIdFromAuth(auth);

        if (jobRepository.findById(id).isEmpty()) {
            return ResponseEntity.badRequest().body("Job not found.");
        }
        if (applicationRepository.existsByJobIdAndStudentId(id, userId)) {
            return ResponseEntity.badRequest().body("Already applied to this job.");
        }

        Application app = new Application();
        app.setJobId(id);
        app.setStudentId(userId);
        app.setStatus("PENDING");
        return ResponseEntity.ok(applicationRepository.save(app));
    }

    // Helper (assuming email is username in auth)
    @Autowired
    UserRepository userRepository;

    private Long getUserIdFromAuth(Authentication auth) {
        return userRepository.findByEmail(auth.getName()).get().getId();
    }
}
