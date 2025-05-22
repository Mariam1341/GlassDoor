package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.service.CandidateApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateApplicationController {
    @Autowired
    private CandidateApplicationService candidateApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<?>> applyToJob(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> request) {

        return ResponseEntity.ok(candidateApplicationService.applyToJob(authHeader, request));
    }
    @GetMapping("/results/{jobId}")
    public ResponseEntity<ApiResponse<List<CandidateApplication>>> getSortedResults(
            @PathVariable String jobId,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(candidateApplicationService.getResults(jobId, authHeader));
    }

}
