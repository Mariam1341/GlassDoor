# 🔍 AI-Powered Glassdoor-like Job Hiring & Evaluation Platform

A full-stack smart hiring system where companies can post jobs, generate AI-based exams, invite candidates, and automatically evaluate their performance — all in one platform. Inspired by Glassdoor and built for modern recruitment.

![Made With](https://img.shields.io/badge/Built%20With-Java%20%7C%20Spring%20Boot%20%7C%20React%20%7C%20Gemini%20AI-blueviolet)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

---

## 🚀 Features

- 🔐 Role-based login (HR & Candidate)
- 🏢 Company registration and job posting
- 🤖 AI-powered exam generation using Gemini API
- 📝 Online multiple-choice exam solving
- ✅ Auto exam scoring & ranking
- 📩 Email notifications to candidates
- 📊 HR dashboard to manage jobs, interviews, and exams
- 🔍 Candidate dashboard to apply and take exams

---

## 📌 User Journey

1. HR registers and creates a company profile
2. HR posts a job and adds requirements
3. HR generates a custom exam using AI (Gemini)
4. Candidates browse and apply for jobs
5. Candidates receive email notifications with exam links
6. Candidates take the exam online
7. System auto-scores and ranks applicants
8. HR views candidate scores and shortlists top performers

---

## 🛠️ Technologies Used

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React.js, React Router, CSS Modules |
| Backend      | Spring Boot, Spring Security        |
| Database     | MongoDB                             |
| AI           | Gemini API (Google)                 |
| Authentication | JWT Token-based Auth              |
| Mail Service | Spring Mail with Gmail SMTP         |
| Dev Tools    | Postman, VSCode, IntelliJ           |

---

## 📦 API Overview

- `POST /auth/register` – User signup  
- `POST /auth/login` – Authentication  
- `POST /jobs/create` – HR creates a job  
- `POST /ai/generate-exam` – Gemini exam generation  
- `POST /exams/save` – Save and assign exam  
- `POST /candidate/apply` – Apply to a job  
- `GET /candidate/exam/{jobId}` – Fetch assigned exam  
- `POST /candidate/exam/submit` – Submit answers and receive score  

---

## 📷 Screenshots

> Add these if available (HR dashboard, exam UI, etc.)

---

## 💡 Challenges Faced

- Handling AI response formatting for JSON
- Secure role-based access and route protection
- Email service integration with Gmail SMTP
- Auto-grading logic and edge cases
- Clean exam and job linking via IDs

---

## 🔮 Future Enhancements

- Deploy to Render/Heroku
- Add CV upload for candidates
- Support video-based interviews
- Add analytics for HR (exam stats, candidate funnel)
- AI-powered job description & email writing

---

## 🧠 AI Prompt Example

