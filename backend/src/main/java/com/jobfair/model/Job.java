package com.jobfair.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long recruiterId; // Maps to Recruiter.userId

    @NotBlank(message = "Job title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Job description is required")
    @Column(length = 2000)
    private String description;

    private String location;

    private String salary;

    private LocalDateTime createdAt;

    public Job() {
    }

    public Job(Long id, Long recruiterId, String title, String description, String location, String salary,
            LocalDateTime createdAt) {
        this.id = id;
        this.recruiterId = recruiterId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(Long recruiterId) {
        this.recruiterId = recruiterId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
