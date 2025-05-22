package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.ExamDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Exam;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.UserRepository;
import com.glassdoor.backend.service.ExamService;
import com.glassdoor.backend.service.JobService;
import com.glassdoor.backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/exams")
@RequiredArgsConstructor
public class ExamController {


    @Autowired
    private ExamService examService;

    @PostMapping("/save")
    public ResponseEntity<?> saveExam(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ExamDTO request
    ) {

        return ResponseEntity.ok(examService.saveExam(authHeader, request));
    }
}
