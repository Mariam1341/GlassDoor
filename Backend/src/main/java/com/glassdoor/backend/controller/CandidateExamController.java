package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.ExamSubmissionDTO;
import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.entity.Exam;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.repository.CandidateApplicationRepository;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.JobRepository;
import com.glassdoor.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate/exam")
@RequiredArgsConstructor
public class CandidateExamController {

    private final JobRepository jobRepository;
    private final ExamRepository examRepository;
    private final CandidateApplicationRepository applicationRepository;
    private final JwtService jwtService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitExam(
            @RequestBody ExamSubmissionDTO submission,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.replace("Bearer ", "");
        String candidateEmail = jwtService.extractUserName(token);

        // Step 1: Confirm candidate applied for the job
        CandidateApplication application = applicationRepository
                .findByJobIdAndCandidateEmail(submission.getJobId(), candidateEmail)
                .orElseThrow(() -> new RuntimeException("You didn't apply for this job."));

        // Step 2: Get the job and assigned exam
        Job job = jobRepository.findById(submission.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (job.getExamId() == null) {
            return ResponseEntity.badRequest().body("This job has no assigned exam.");
        }

        Exam exam = examRepository.findById(job.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found."));

        // Step 3: Grade answers
        int totalQuestions = exam.getQuestions().size();
        int correctCount = 0;

        for (int i = 0; i < totalQuestions; i++) {
            String correct = exam.getQuestions().get(i).getCorrectAnswer().trim();
            String answer = submission.getAnswers().get(i);

            if (answer != null && answer.trim().equalsIgnoreCase(correct)) {
                correctCount++;
            }
        }

        int score = (int) ((correctCount * 100.0) / totalQuestions);

        // Step 4: Save result
        application.setHasTakenExam(true);
        application.setHasPendingExam(false);
        application.setScore(score);
        applicationRepository.save(application);

        return ResponseEntity.ok("Exam submitted successfully. Your score is " + score + "%.");
    }
    @GetMapping("/{jobId}")
    public ResponseEntity<?> getAssignedExam(
            @PathVariable String jobId,
            @RequestHeader("Authorization") String tokenHeader
    ) {
        String token = tokenHeader.replace("Bearer ", "");
        String candidateEmail = jwtService.extractUserName(token);

        // Check if candidate applied for job
        CandidateApplication application = applicationRepository
                .findByJobIdAndCandidateEmail(jobId, candidateEmail)
                .orElseThrow(() -> new RuntimeException("Not applied to this job"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (job.getExamId() == null) {
            return ResponseEntity.badRequest().body("No exam assigned to this job.");
        }

        Exam exam = examRepository.findById(job.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        return ResponseEntity.ok(exam);
    }
}

