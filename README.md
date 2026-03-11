# Job Fair Portal MVP

A full-stack web application connecting students with recruiters for campus job fairs. Built with Spring Boot 3.x and React 18.

## Project Structure
- `/backend`: Java Spring Boot backend (REST API, JWT Auth, PostgreSQL Database)
- `/frontend`: React frontend (Vite, Tailwind CSS, React Router)

## Prerequisites
- Java 17+
- Node.js 18+
- Maven
- PostgreSQL 14+

## Setup & Running the Application

### 1. Run the Backend
The backend uses PostgreSQL for persistent storage.

Create PostgreSQL database/user (example):
```sql
CREATE DATABASE jobfairdb;
CREATE USER jobfair WITH ENCRYPTED PASSWORD 'jobfair123';
GRANT ALL PRIVILEGES ON DATABASE jobfairdb TO jobfair;
```

Set DB env vars (or use defaults in `application.properties`):
```bash
export DB_URL='jdbc:postgresql://localhost:5432/jobfairdb'
export DB_USERNAME='jobfair'
export DB_PASSWORD='jobfair123'
```

Then run:
```bash
cd backend
./mvnw spring-boot:run
```
- API will run on: `http://localhost:8080/api`

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
- Frontend will run on: `http://localhost:5173` (default Vite port) or `http://localhost:3000` (depending on environment/vite config). Check your terminal output.

## Initial Users

By default, startup seeding is disabled for persistent PostgreSQL (`spring.sql.init.mode=never`), so create accounts from the Register page.

If you want sample data once, temporarily set:
```properties
spring.sql.init.mode=always
```
start the app once, then set it back to `never`.

## Features Included (MVP)
- **Authentication**: JWT-based login/registration with Student & Recruiter roles
- **Student Flow**: Browse jobs with basic string search, view job details, apply to jobs, manage profile, view application statuses
- **Recruiter Flow**: Dashboard metrics, create new job postings, view applications for their postings, manage company profile, accept/reject candidates

## API Documentation (Selected Endpoints)
- `POST /api/auth/register` - Create new account (JSON body: `email`, `password`, `name`, `role="ROLE_STUDENT" or "ROLE_RECRUITER"`)
- `POST /api/auth/login` - Authenticate returning JWT
- `GET /api/jobs` - View jobs (Public/Authenticated depending on strictness - MVP requires Auth)
- `POST /api/jobs` - Create Job (Recruiter Only)
- `POST /api/applications` - Create Application (Student Only)
