# 🎯 TalentHire — Job Fair Portal

A full-stack Job Fair Portal connecting **Students** with **Recruiters**. Students can browse and apply for jobs; recruiters can post jobs and manage applicants.

---

## 📁 Project Structure

```
JobFair/
├── backend/          # Spring Boot REST API (Java 17)
│   └── src/main/java/com/jobfair/
│       ├── controller/       # REST Controllers (HTTP layer)
│       ├── model/            # JPA Entities (DB tables)
│       ├── dto/              # Data Transfer Objects (request/response)
│       ├── repository/       # Spring Data JPA Repositories
│       ├── security/         # JWT Filter, JwtUtil, UserDetailsService
│       └── config/           # SecurityConfig, WebConfig, GlobalExceptionHandler
└── frontend/         # React + Vite (JavaScript)
    └── src/
        ├── pages/            # Route-level page components
        ├── components/       # Reusable UI components
        ├── context/          # AuthContext (React Context API)
        └── services/         # Axios API service layer
```

---

## ⚙️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Backend   | Java 17, Spring Boot 3, Spring Security 6       |
| Auth      | JWT (JSON Web Tokens), BCrypt password hashing  |
| Database  | PostgreSQL (via Spring Data JPA / Hibernate)    |
| Frontend  | React 18, Vite, Axios, React Router v6          |
| Styling   | Tailwind CSS                                    |

---

## 🚀 Getting Started

### Backend
```bash
cd backend
# Configure DB in src/main/resources/application.properties
./mvnw spring-boot:run
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 🔐 Authentication

This app uses **JWT (Bearer Token)** authentication.

- All endpoints except `/api/auth/**` require a valid JWT in the `Authorization` header.
- Format: `Authorization: Bearer <token>`
- Roles: `ROLE_STUDENT` and `ROLE_RECRUITER`

---

## 📌 API Reference

Base URL: `http://localhost:5000`

---

### 🔑 Auth Controller — `/api/auth`
> Public endpoints — no authentication required.

#### `POST /api/auth/register`
Register a new user account (student or recruiter).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "ROLE_STUDENT"
}
```

| Field    | Type   | Validation                    |
|----------|--------|-------------------------------|
| name     | String | Required                      |
| email    | String | Required, valid email format  |
| password | String | Required, min 6 characters    |
| role     | String | `ROLE_STUDENT` or `ROLE_RECRUITER` |

**Response:**
```
200 OK → "User registered successfully!"
400 Bad Request → "Error: Email is already in use!"
```

---

#### `POST /api/auth/login`
Login and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "role": "ROLE_STUDENT"
}
```

---

### 💼 Job Controller — `/api/jobs`
> Requires Authentication.

#### `GET /api/jobs`
Get all jobs. Optionally filter by keyword.

- **Access:** `ROLE_STUDENT`, `ROLE_RECRUITER`
- **Query Params:** `?search=<keyword>` (optional, searches title and description)

**Response:** Array of `Job` objects.

---

#### `GET /api/jobs/{id}`
Get a single job by ID.

- **Access:** `ROLE_STUDENT`, `ROLE_RECRUITER`
- **Path Param:** `id` — Job ID

**Response:** `Job` object or `404 Not Found`

---

#### `GET /api/jobs/search`
Search jobs by keyword.

- **Access:** `ROLE_STUDENT`, `ROLE_RECRUITER`
- **Query Params:** `?q=<keyword>`

---

#### `GET /api/jobs/recruiter/my`
Get all jobs posted by the currently logged-in recruiter.

- **Access:** `ROLE_RECRUITER` only

---

#### `POST /api/jobs`
Post a new job listing.

- **Access:** `ROLE_RECRUITER` only

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Backend Java developer role...",
  "location": "Bangalore",
  "salary": "₹8 LPA"
}
```

| Field       | Type   | Validation    |
|-------------|--------|---------------|
| title       | String | Required      |
| description | String | Required      |
| location    | String | Optional      |
| salary      | String | Optional      |

**Response:** Created `Job` object with auto-assigned `id`, `recruiterId`, `createdAt`.

---

#### `PUT /api/jobs/{id}`
Update an existing job (only your own jobs).

- **Access:** `ROLE_RECRUITER` only
- **Path Param:** `id` — Job ID
- **Body:** Same as POST

**Response:**
```
200 OK → Updated Job object
403 Forbidden → "Unauthorized to edit this job"
404 Not Found
```

---

#### `DELETE /api/jobs/{id}`
Delete a job (only your own jobs).

- **Access:** `ROLE_RECRUITER` only
- **Path Param:** `id` — Job ID

**Response:**
```
200 OK
403 Forbidden → "Unauthorized to delete this job"
404 Not Found
```

---

#### `POST /api/jobs/{id}/apply`
Apply to a job directly using the job ID in the URL path.

- **Access:** `ROLE_STUDENT` only
- **Path Param:** `id` — Job ID

**Response:**
```
200 OK → Application object
400 Bad Request → "Already applied to this job."
400 Bad Request → "Job not found."
```

---

### 📋 Application Controller — `/api/applications`
> Requires Authentication.

#### `POST /api/applications`
Apply to a job (alternative endpoint).

- **Access:** `ROLE_STUDENT` only

**Request Body:**
```json
{ "jobId": 3 }
```

**Response:**
```
200 OK → Application object
400 Bad Request → "Already applied to this job."
400 Bad Request → "Student profile not found."
```

---

#### `GET /api/applications/student`
Get all applications submitted by the currently logged-in student.

- **Access:** `ROLE_STUDENT` only

**Response:** Array of `Application` objects.

---

#### `GET /api/applications/job/{jobId}`
Get all applicants for a specific job (only for the job's recruiter).

- **Access:** `ROLE_RECRUITER` only
- **Path Param:** `jobId`

**Response:**
```
200 OK → Array of Application objects
403 Forbidden → "Unauthorized"
```

---

#### `PUT /api/applications/{id}/status`
Update the status of an application (accept or reject).

- **Access:** `ROLE_RECRUITER` only
- **Path Param:** `id` — Application ID

**Request Body:**
```json
{ "status": "ACCEPTED" }
```

Allowed values: `PENDING`, `ACCEPTED`, `REJECTED`

**Response:**
```
200 OK → Updated Application object
400 Bad Request → "Invalid status..."
403 Forbidden → "Unauthorized"
404 Not Found
```

---

### 🎓 Student Controller — `/api/students`
> Requires Authentication.

#### `GET /api/students/profile`
Get the profile of the currently logged-in student.

- **Access:** `ROLE_STUDENT` only

**Response:**
```json
{
  "userId": 1,
  "name": "John Doe",
  "email": "john@student.com",
  "phone": "9876543210",
  "degree": "B.Tech CSE",
  "cgpa": 8.5,
  "skills": "Java, React, Spring Boot"
}
```

---

#### `GET /api/students/{id}`
Get a specific student's profile (for recruiters to view applicant details).

- **Access:** `ROLE_RECRUITER` only
- **Path Param:** `id` — Student's user ID

---

#### `PUT /api/students/profile`
Update the currently logged-in student's profile.

- **Access:** `ROLE_STUDENT` only

**Request Body (all fields optional):**
```json
{
  "name": "John Doe",
  "phone": "9999999999",
  "degree": "B.Tech CSE",
  "cgpa": 9.0,
  "skills": "Java, Spring Boot, PostgreSQL"
}
```

**Response:** `"Profile updated successfully"`

---

### 🏢 Recruiter Controller — `/api/recruiters`
> Requires Authentication.

#### `GET /api/recruiters/profile`
Get the profile of the currently logged-in recruiter.

- **Access:** `ROLE_RECRUITER` only

**Response:**
```json
{
  "userId": 2,
  "name": "HR Manager",
  "email": "hr@company.com",
  "companyName": "TechCorp Pvt Ltd",
  "phone": "8888888888"
}
```

---

#### `PUT /api/recruiters/profile`
Update the currently logged-in recruiter's profile.

- **Access:** `ROLE_RECRUITER` only

**Request Body (all fields optional):**
```json
{
  "name": "HR Manager",
  "companyName": "TechCorp Pvt Ltd",
  "phone": "8888888888"
}
```

**Response:** `"Profile updated successfully"`

---

## 🗄️ Data Models (Database Schema)

### `users` table — `User.java`
Central authentication table. Every user (student or recruiter) has one row here.

| Column   | Type    | Constraints         |
|----------|---------|---------------------|
| id       | BIGINT  | PK, Auto-generated  |
| email    | VARCHAR | Unique, Not Null    |
| password | VARCHAR | Not Null (BCrypt)   |
| name     | VARCHAR | Not Null            |
| role     | VARCHAR | `ROLE_STUDENT` / `ROLE_RECRUITER` |

---

### `students` table — `Student.java`
Extended profile for student users. One-to-one with `users`.

| Column  | Type    | Constraints         |
|---------|---------|---------------------|
| user_id | BIGINT  | PK, FK → users.id   |
| phone   | VARCHAR | Optional            |
| degree  | VARCHAR | Optional            |
| cgpa    | DOUBLE  | Optional            |
| skills  | VARCHAR | Optional (comma-sep)|

---

### `recruiters` table — `Recruiter.java`
Extended profile for recruiter users. One-to-one with `users`.

| Column       | Type    | Constraints         |
|--------------|---------|---------------------|
| user_id      | BIGINT  | PK, FK → users.id   |
| company_name | VARCHAR | Optional            |
| phone        | VARCHAR | Optional            |

---

### `jobs` table — `Job.java`
Job listings posted by recruiters.

| Column       | Type      | Constraints           |
|--------------|-----------|-----------------------|
| id           | BIGINT    | PK, Auto-generated    |
| recruiter_id | BIGINT    | FK → users.id, Not Null |
| title        | VARCHAR   | Not Null              |
| description  | VARCHAR(2000) | Not Null           |
| location     | VARCHAR   | Optional              |
| salary       | VARCHAR   | Optional              |
| created_at   | TIMESTAMP | Auto-set on creation  |

---

### `applications` table — `Application.java`
Tracks which student applied to which job.

| Column     | Type      | Constraints               |
|------------|-----------|---------------------------|
| id         | BIGINT    | PK, Auto-generated        |
| job_id     | BIGINT    | FK → jobs.id, Not Null    |
| student_id | BIGINT    | FK → users.id, Not Null   |
| status     | VARCHAR   | `PENDING` / `ACCEPTED` / `REJECTED` |
| applied_at | TIMESTAMP | Auto-set on creation      |

> **Unique constraint:** A student cannot apply to the same job twice (`existsByJobIdAndStudentId`).

---

## 🔧 DTOs (Data Transfer Objects)

DTOs are used to shape incoming requests and outgoing responses, separating API contracts from internal models.

### `RegisterRequest.java`
Used for `POST /api/auth/register`. Includes Jakarta validation annotations:
- `@NotBlank` on `name`, `email`, `password`, `role`
- `@Email` on `email`
- `@Size(min=6)` on `password`

### `LoginRequest.java`
Used for `POST /api/auth/login`.
- Fields: `email`, `password`

### `JwtResponse.java`
Returned on successful login.
- Fields: `token`, `id`, `email`, `name`, `role`

---

## 🛡️ Security Architecture

```
Client → [JwtAuthenticationFilter] → [SecurityFilterChain] → [Controller]
```

### Components

| Component | File | Responsibility |
|-----------|------|---------------|
| `SecurityConfig` | `config/SecurityConfig.java` | Configures filter chain, BCrypt encoder, CORS, CSRF, session |
| `JwtAuthenticationFilter` | `security/JwtAuthenticationFilter.java` | Intercepts every request, validates JWT, sets auth context |
| `JwtUtil` | `security/JwtUtil.java` | Generates and validates JWT tokens |
| `UserDetailsServiceImpl` | `security/UserDetailsServiceImpl.java` | Loads user from DB by email for Spring Security |
| `GlobalExceptionHandler` | `config/GlobalExceptionHandler.java` | Handles validation errors and global exceptions |

### Security Rules
- **Public:** `POST /api/auth/login`, `POST /api/auth/register`, `OPTIONS /**`
- **Authenticated (any role):** `GET /api/jobs`, `GET /api/jobs/{id}`, `GET /api/jobs/search`
- **ROLE_STUDENT only:** Apply to jobs, view own applications, manage own profile
- **ROLE_RECRUITER only:** Post/edit/delete jobs, view applicants, update application status

### Security Headers Applied
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security (HSTS)`: 1 year, includeSubDomains
- `X-Frame-Options: SAMEORIGIN`
- Stateless sessions (JWT, no HTTP sessions)
- CSRF disabled (stateless JWT API)

---

## 🗂️ Repository Layer

Spring Data JPA repositories with custom query methods:

| Repository | Custom Methods |
|------------|---------------|
| `UserRepository` | `findByEmail()`, `existsByEmail()` |
| `JobRepository` | `findByRecruiterId()`, `findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase()` |
| `ApplicationRepository` | `findByStudentId()`, `findByJobId()`, `existsByJobIdAndStudentId()` |
| `StudentRepository` | `findById()` (inherited) |
| `RecruiterRepository` | `findById()` (inherited) |

---

## 🌐 Frontend Overview

| Path | Page | Access |
|------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/student/dashboard` | Student Dashboard | ROLE_STUDENT |
| `/student/browse-jobs` | Browse Jobs | ROLE_STUDENT |
| `/student/my-applications` | My Applications | ROLE_STUDENT |
| `/student/profile` | Student Profile | ROLE_STUDENT |
| `/student/jobs/:id` | Job Details | ROLE_STUDENT |
| `/recruiter/dashboard` | Recruiter Dashboard | ROLE_RECRUITER |
| `/recruiter/post-job` | Post a Job | ROLE_RECRUITER |
| `/recruiter/my-jobs` | My Job Listings | ROLE_RECRUITER |
| `/recruiter/applicants/:jobId` | View Applicants | ROLE_RECRUITER |
| `/recruiter/profile` | Recruiter Profile | ROLE_RECRUITER |

### State Management
- **AuthContext** (`context/AuthContext.jsx`): Stores JWT token, user info, login/logout functions globally via React Context API.
- **Private Routes** (`components/PrivateRoute.jsx`): Protects role-specific routes, redirects unauthenticated users to `/login`.

### API Service Layer (`services/`)
| File | Responsibility |
|------|---------------|
| `authService.js` | Login & register API calls |
| `jobService.js` | Job CRUD and search calls |
| `applicationService.js` | Apply, list, and update application status |
| `studentService.js` | Student profile get/update |
| `api.js` | Axios instance with base URL and JWT interceptor |

---

## 👤 Seed Data

Default test accounts are populated via `src/main/resources/data.sql`:

| Role | Email | Password |
|------|-------|----------|
| Student | `student@test.com` | `password` |
| Recruiter | `recruiter@test.com` | `password` |

---

## 📄 License

This project is built for educational/demonstration purposes as part of a Job Fair Portal mini-project.
