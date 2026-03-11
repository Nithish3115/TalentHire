package com.jobfair.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "recruiters")
public class Recruiter {

    @Id
    private Long userId; // Maps to User.id

    private String companyName;
    private String phone;

    public Recruiter() {
    }

    public Recruiter(Long userId, String companyName, String phone) {
        this.userId = userId;
        this.companyName = companyName;
        this.phone = phone;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
