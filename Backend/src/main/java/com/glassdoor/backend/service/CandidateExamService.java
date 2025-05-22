package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.ExamSubmissionDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.entity.Exam;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.repository.CandidateApplicationRepository;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CandidateExamService {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private CandidateApplicationRepository applicationRepository;
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ExamRepository examRepository;
    public ApiResponse<Integer> submitExam(ExamSubmissionDTO submission, String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String candidateEmail = jwtService.extractUserName(token);

        CandidateApplication application = applicationRepository
                .findByJobIdAndCandidateEmail(submission.getJobId(), candidateEmail)
                .orElseThrow(() -> new RuntimeException("You didn't apply for this job."));

        Job job = jobRepository.findById(submission.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (job.getExamId() == null) {
            throw new RuntimeException("This job has no assigned exam.");
        }

        Exam exam = examRepository.findById(job.getExamId())
                .orElseThrow(() -> new RuntimeException("Exam not found."));

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

        application.setHasTakenExam(true);
        application.setHasPendingExam(false);
        application.setScore(score);
        applicationRepository.save(application);

        return ApiResponse.<Integer>builder()
                        .success(true)
                        .message("Exam submitted successfully.")
                        .data(score)
                        .build();
    }

    public ApiResponse<?> getAssignedExam(String authHeader, String jobId) {

        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtService.extractUserName(token);

            CandidateApplication app = applicationRepository.findByJobIdAndCandidateEmail(jobId, email)
                    .orElseThrow(() -> new RuntimeException("Not applied to this job"));

            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));

            Exam exam = examRepository.findById(job.getExamId())
                    .orElseThrow(() -> new RuntimeException("Exam not found for this job"));

            return ApiResponse.builder()
                            .success(true)
                            .message("Exam loaded")
                            .data(exam)
                            .build();
        } catch (Exception ex) {
            return
                    ApiResponse.builder()
                            .success(false)
                            .message(ex.getMessage())
                            .build();
        }
    }


}
