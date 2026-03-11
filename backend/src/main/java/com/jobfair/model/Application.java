package com.jobfair.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long jobId;

    @Column(nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private String status; // e.g., "PENDING", "ACCEPTED", "REJECTED"

    private LocalDateTime appliedAt;

    public Application() {
    }

    public Application(Long id, Long jobId, Long studentId, String status, LocalDateTime appliedAt) {
        this.id = id;
        this.jobId = jobId;
        this.studentId = studentId;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}
