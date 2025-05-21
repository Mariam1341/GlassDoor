package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.ExamDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Exam;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.UserRepository;
import com.glassdoor.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamRepository examRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveExam(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ExamDTO request // Add @Valid
    ) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUserName(token);
        User hr = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Exam exam = Exam.builder()
                .examTitle(request.getExamTitle())
                .jobId(request.getJobId())
                .questions(request.getQuestions())
                .createdBy(hr.getId())
                .build();

        examRepository.save(exam);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Exam saved successfully")
                        .data(exam)
                        .build()
        );
    }
}
