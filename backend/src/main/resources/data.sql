-- Passwords are 'password123' bcrypt encoded

-- Seed Users
-- The hash below corresponds to 'password123' generated with BCrypt rounds=10
INSERT INTO users (email, password, name, role) VALUES ('student1@university.edu', '$2a$10$eL72hbZwbCod3gfk/88z5uZRIMAkIcaIrURbYnhYZzBXQo1HImXBq', 'Alice Smith', 'ROLE_STUDENT');
INSERT INTO users (email, password, name, role) VALUES ('student2@university.edu', '$2a$10$eL72hbZwbCod3gfk/88z5uZRIMAkIcaIrURbYnhYZzBXQo1HImXBq', 'Bob Johnson', 'ROLE_STUDENT');

INSERT INTO users (email, password, name, role) VALUES ('recruiter1@techcorp.com', '$2a$10$eL72hbZwbCod3gfk/88z5uZRIMAkIcaIrURbYnhYZzBXQo1HImXBq', 'Jane Doe', 'ROLE_RECRUITER');
INSERT INTO users (email, password, name, role) VALUES ('recruiter2@startup.io', '$2a$10$eL72hbZwbCod3gfk/88z5uZRIMAkIcaIrURbYnhYZzBXQo1HImXBq', 'John Smith', 'ROLE_RECRUITER');

-- Seed Students
INSERT INTO students (user_id, phone, degree, cgpa, skills) VALUES (1, '555-0100', 'B.S. Computer Science', 3.8, 'Java, React, SQL');
INSERT INTO students (user_id, phone, degree, cgpa, skills) VALUES (2, '555-0101', 'M.S. Data Science', 3.9, 'Python, Machine Learning, AWS');

-- Seed Recruiters
INSERT INTO recruiters (user_id, company_name, phone) VALUES (3, 'Tech Corp', '555-0200');
INSERT INTO recruiters (user_id, company_name, phone) VALUES (4, 'Startup IO', '555-0201');

-- Seed Jobs
INSERT INTO jobs (recruiter_id, title, description, location, salary, created_at) VALUES (3, 'Junior Software Engineer', 'We are looking for a motivated junior developer to join our backend team working with Java and Spring Boot.', 'San Francisco, CA', '$90,000 - $110,000', CURRENT_TIMESTAMP);
INSERT INTO jobs (recruiter_id, title, description, location, salary, created_at) VALUES (3, 'Frontend Developer', 'Join our frontend team to build beautiful UI with React and Tailwind CSS.', 'Remote', '$85,000 - $105,000', CURRENT_TIMESTAMP);
INSERT INTO jobs (recruiter_id, title, description, location, salary, created_at) VALUES (4, 'Data Scientist Intern', 'Summer 2024 Internship. Work on exciting ML models.', 'New York, NY', '$40/hr', CURRENT_TIMESTAMP);
INSERT INTO jobs (recruiter_id, title, description, location, salary, created_at) VALUES (4, 'Full Stack Developer', 'Looking for a versatile engineer who can handle both React and Node.js.', 'Austin, TX (Hybrid)', '$100,000 - $130,000', CURRENT_TIMESTAMP);
INSERT INTO jobs (recruiter_id, title, description, location, salary, created_at) VALUES (3, 'DevOps Engineer', 'Help us build robust CI/CD pipelines and manage AWS infrastructure.', 'San Francisco, CA', '$120,000 - $150,000', CURRENT_TIMESTAMP);

-- Seed Applications
INSERT INTO applications (job_id, student_id, status, applied_at) VALUES (1, 1, 'PENDING', CURRENT_TIMESTAMP);
INSERT INTO applications (job_id, student_id, status, applied_at) VALUES (2, 1, 'ACCEPTED', CURRENT_TIMESTAMP);
INSERT INTO applications (job_id, student_id, status, applied_at) VALUES (3, 2, 'PENDING', CURRENT_TIMESTAMP);
