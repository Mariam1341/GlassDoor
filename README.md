# 🧠 AI-Driven Job Hiring & Evaluation Platform

An intelligent full-stack web platform inspired by Glassdoor, empowering companies to automate hiring, test candidate skills, and make faster decisions using AI-generated exams and automatic grading.

![Java](https://img.shields.io/badge/Backend-Java%20%7C%20Spring%20Boot-blue)
![React](https://img.shields.io/badge/Frontend-React.js-blueviolet)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![AI](https://img.shields.io/badge/AI-Gemini%20API-red)
![Status](https://img.shields.io/badge/Project-Active-lightgrey)

---

## 🔍 Overview

This platform simplifies technical recruitment by letting companies:

- Register and manage their company profile
- Post jobs with requirements
- Generate custom AI-powered exams per job
- Assign exams to applicants automatically
- Score candidate exams instantly
- View candidate rankings by score
- Notify candidates via email

All while giving candidates a smooth, focused experience for applying and taking exams online.

---

## ✨ Key Features

### 🏢 For HR:
- Role-based login and dashboard
- Company creation and management
- Job creation and listing
- AI exam generation with Gemini
- Exam assignment and automatic grading
- View all applicants and their scores
- Candidate ranking per job
- Email notifications on exam assignment

### 👩‍💻 For Candidates:
- Role-based login and dashboard
- Apply to jobs
- Receive exam links via email
- Take exams online
- Instant scoring upon submission

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React.js, React Router, CSS Modules  |
| Backend   | Spring Boot, Spring Security         |
| Database  | MongoDB                              |
| AI        | Gemini API (Google PaLM)             |
| Auth      | JWT (JSON Web Token)                 |
| Email     | Spring Mail + Gmail SMTP             |
| Dev Tools | Postman, IntelliJ, VSCode            |

---
## 🔮 Future Enhancements

- Deploy to Render/Heroku
- Support video-based interviews
- Add analytics for HR (exam stats, candidate funnel)
- AI-powered job description & email writing

---

## 🧭 App Workflow

```mermaid
graph TD;
    subgraph HR Flow
        A[HR Registers] --> B[Creates Company]
        B --> C[Posts Job]
        C --> D[Generates Exam with AI]
        D --> E[Assigns Exam to Job]
        E --> F[HR Dashboard: View Applicants]
    end

    subgraph Candidate Flow
        G[Candidate Registers] --> H[Browses Jobs]
        H --> I[Applies to Job]
        I --> J[Receives Exam Link via Email]
        J --> K[Takes Exam]
        K --> L[Auto-Scoring + Submission]
        L --> M[Ranked with Other Candidates]
    end

    E --> I
    L --> F



