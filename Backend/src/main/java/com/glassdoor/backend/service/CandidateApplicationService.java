package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.repository.CandidateApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CandidateApplicationService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CandidateApplicationRepository applicationRepository;

    public ApiResponse applyToJob(String authHeader, Map<String, String> request) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUserName(token);
        String jobId = request.get("jobId");


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

        return ApiResponse.builder()
                .success(true)
                .data("You apply to this Job").build();
    }

    public ApiResponse getResults(String jobId, String authHeader){
        List<CandidateApplication> applications = applicationRepository.findByJobId(jobId);
        List<CandidateApplication> sorted = applications.stream()
                .filter(CandidateApplication::isHasTakenExam)
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .collect(Collectors.toList());

        return ApiResponse.<List<CandidateApplication>>builder()
                        .success(true)
                        .message("Sorted candidates by score")
                        .data(sorted)
                        .build()
        ;
    }

}
