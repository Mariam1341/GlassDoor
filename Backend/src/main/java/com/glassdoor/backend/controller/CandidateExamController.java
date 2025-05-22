package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.ExamSubmissionDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.service.CandidateExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/candidate/exam")
@RequiredArgsConstructor
public class CandidateExamController {


    @Autowired
    private CandidateExamService candidateExamService;

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<Integer>> submitExam(
            @RequestBody ExamSubmissionDTO submission,
            @RequestHeader("Authorization") String authHeader
    ) {

        return ResponseEntity.ok( candidateExamService.submitExam(submission, authHeader));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<?> getAssignedExam(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String jobId) {

            return ResponseEntity.ok(candidateExamService.getAssignedExam(authHeader, jobId));

    }

}

