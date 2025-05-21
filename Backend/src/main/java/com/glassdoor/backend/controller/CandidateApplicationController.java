package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.repository.CandidateApplicationRepository;
import com.glassdoor.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateApplicationController {

    private final CandidateApplicationRepository applicationRepository;
    private final JwtService jwtService;

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<?>> applyToJob(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> request) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUserName(token);
        String jobId = request.get("jobId");

        // Check if already applied
        boolean alreadyApplied = applicationRepository
                .findByJobIdAndCandidateEmail(jobId, email)
                .isPresent();

        if (alreadyApplied) {
            throw new RuntimeException("You already applied to this job.");
        }

        CandidateApplication application = CandidateApplication.builder()
                .jobId(jobId)
                .candidateEmail(email)
                .hasTakenExam(false)
                .build();

        applicationRepository.save(application);
        System.out.println("Received jobId = " + jobId + " for user " + email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Applied successfully.")
                        .build()
        );
    }
}
