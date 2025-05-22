package com.glassdoor.backend.controller;

import com.glassdoor.backend.entity.ExamSession;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.ExamSessionRepository;
import com.glassdoor.backend.repository.JobRepository;
import com.glassdoor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/exam-sessions")
@RequiredArgsConstructor
public class ExamSessionController {
//
//    private final ExamSessionRepository examSessionRepository;
//    private final UserRepository userRepository;
//    private final JobRepository jobRepository;
//    private final ExamRepository examRepository;
//
//    // HR sends exam to all candidates for a job
//    @PostMapping("/assign/{jobId}/{examId}")
//    public ResponseEntity<?> assignExamToCandidates(
//            @PathVariable String jobId,
//            @PathVariable String examId) {
//
//        // Get all candidates who applied for this job
//        List<User> candidates = userRepository.findByAppliedJobsContaining(jobId);
//
//        // Create exam session for each candidate
//        List<ExamSession> sessions = candidates.stream()
//                .map(candidate -> ExamSession.builder()
//                        .userId(candidate.getId())
//                        .jobId(jobId)
//                        .examId(examId)
//                        .status("ASSIGNED")
//                        .build())
//                .collect(Collectors.toList());
//
//        examSessionRepository.saveAll(sessions);
//
//        return ResponseEntity.ok("Exam assigned to " + sessions.size() + " candidates");
//    }
//
//    // Candidate submits answers
//    @PostMapping("/submit/{sessionId}")
//    public ResponseEntity<?> submitExam(
//            @PathVariable String sessionId,
//            @RequestBody ExamSubmission submission) {
//
//        ExamSession session = examSessionRepository.findById(sessionId)
//                .orElseThrow(() -> new RuntimeException("Exam session not found"));
//
//        Exam exam = examRepository.findById(session.getExamId())
//                .orElseThrow(() -> new RuntimeException("Exam not found"));
//
//        // Grade the exam
//        int score = calculateScore(submission.getAnswers(), exam.getQuestions());
//
//        session.setSubmittedAnswers(submission.getAnswers());
//        session.setScore(score);
//        session.setStatus("GRADED");
//        examSessionRepository.save(session);
//
//        return ResponseEntity.ok(score);
//    }
//
//    private int calculateScore(List<String> submittedAnswers, List<Question> questions) {
//        int correct = 0;
//        for (int i = 0; i < questions.size(); i++) {
//            if (i < submittedAnswers.size() &&
//                    questions.get(i).getCorrectAnswer().equals(submittedAnswers.get(i))) {
//                correct++;
//            }
//        }
//        return correct;
//    }
}