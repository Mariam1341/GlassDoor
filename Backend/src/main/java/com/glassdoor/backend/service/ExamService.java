package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.ExamDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Exam;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.ExamRepository;
import com.glassdoor.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Service
public class ExamService {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private JobService jobService;
    public ApiResponse<?> saveExam(String authHeader, ExamDTO request) {

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
        jobService.assignExamToJob(request.getJobId(), exam.getId());

        return ApiResponse.builder()
                        .success(true)
                        .message("Exam saved successfully")
                        .data(exam)
                        .build();
    }
}
