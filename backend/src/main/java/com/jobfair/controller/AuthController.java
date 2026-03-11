package com.jobfair.controller;

import com.jobfair.dto.JwtResponse;
import com.jobfair.dto.LoginRequest;
import com.jobfair.dto.RegisterRequest;
import com.jobfair.model.Recruiter;
import com.jobfair.model.Student;
import com.jobfair.model.User;
import com.jobfair.repository.RecruiterRepository;
import com.jobfair.repository.StudentRepository;
import com.jobfair.repository.UserRepository;
import com.jobfair.security.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    RecruiterRepository recruiterRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Attempting login for: {}", loginRequest.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            logger.info("Authentication successful for: {}", loginRequest.getEmail());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtil.generateJwtToken(authentication);

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity
                    .ok(new JwtResponse(jwt, user.getId(), user.getEmail(), user.getName(), user.getRole()));
        } catch (Exception e) {
            logger.error("Authentication failed for {}: {}", loginRequest.getEmail(), e.getMessage());
            return ResponseEntity.status(401).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        String role = signUpRequest.getRole();
        if (!"ROLE_STUDENT".equals(role) && !"ROLE_RECRUITER".equals(role)) {
            return ResponseEntity.badRequest().body("Error: Invalid role!");
        }
        user.setRole(role);

        User savedUser = userRepository.save(user);

        // Create accompanying profile
        if ("ROLE_STUDENT".equals(role)) {
            Student student = new Student();
            student.setUserId(savedUser.getId());
            studentRepository.save(student);
        } else if ("ROLE_RECRUITER".equals(role)) {
            Recruiter recruiter = new Recruiter();
            recruiter.setUserId(savedUser.getId());
            recruiterRepository.save(recruiter);
        }

        return ResponseEntity.ok("User registered successfully!");
    }
}
