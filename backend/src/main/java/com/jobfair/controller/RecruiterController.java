package com.jobfair.controller;

import com.jobfair.model.Recruiter;
import com.jobfair.model.User;
import com.jobfair.repository.RecruiterRepository;
import com.jobfair.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RecruiterRepository recruiterRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> getMyProfile(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).get();
        Recruiter recruiter = recruiterRepository.findById(user.getId()).orElse(new Recruiter(user.getId(), "", ""));

        Map<String, Object> profile = new HashMap<>();
        profile.put("userId", user.getId());
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        profile.put("companyName", recruiter.getCompanyName());
        profile.put("phone", recruiter.getPhone());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> updates, Authentication auth) {
        User user = userRepository.findByEmail(auth.getName()).get();

        if (updates.containsKey("name")) {
            user.setName((String) updates.get("name"));
            userRepository.save(user);
        }

        Recruiter recruiter = recruiterRepository.findById(user.getId()).orElse(new Recruiter(user.getId(), "", ""));

        if (updates.containsKey("companyName"))
            recruiter.setCompanyName((String) updates.get("companyName"));
        if (updates.containsKey("phone"))
            recruiter.setPhone((String) updates.get("phone"));

        recruiterRepository.save(recruiter);
        return ResponseEntity.ok("Profile updated successfully");
    }
}
