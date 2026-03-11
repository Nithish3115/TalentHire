package com.jobfair.controller;

import com.jobfair.model.Student;
import com.jobfair.model.User;
import com.jobfair.repository.StudentRepository;
import com.jobfair.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getMyProfile(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).get();
        Student student = studentRepository.findById(user.getId()).orElse(new Student(user.getId(), "", "", 0.0, ""));

        Map<String, Object> profile = new HashMap<>();
        profile.put("userId", user.getId());
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        profile.put("phone", student.getPhone());
        profile.put("degree", student.getDegree());
        profile.put("cgpa", student.getCgpa());
        profile.put("skills", student.getSkills());

        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        Student student = studentRepository.findById(id).orElse(null);
        User user = userRepository.findById(id).orElse(null);

        if (student == null || user == null || !"ROLE_STUDENT".equals(user.getRole())) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> profile = new HashMap<>();
        profile.put("userId", user.getId());
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        profile.put("phone", student.getPhone());
        profile.put("degree", student.getDegree());
        profile.put("cgpa", student.getCgpa());
        profile.put("skills", student.getSkills());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> updates, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).get();

        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
            userRepository.save(user);
        }

        Student student = studentRepository.findById(user.getId()).orElse(new Student(user.getId(), "", "", 0.0, ""));

        if (updates.containsKey("phone"))
            student.setPhone((String) updates.get("phone"));
        if (updates.containsKey("degree"))
            student.setDegree((String) updates.get("degree"));
        if (updates.containsKey("cgpa")) {
            Object cgpaRaw = updates.get("cgpa");
            if (cgpaRaw != null) {
                student.setCgpa(Double.valueOf(cgpaRaw.toString()));
            }
        }
        if (updates.containsKey("skills"))
            student.setSkills((String) updates.get("skills"));

        studentRepository.save(student);
        return ResponseEntity.ok("Profile updated successfully");
    }
}
