package com.glassdoor.recruitment.controller;

import com.glassdoor.recruitment.dto.common.ApiResponse;
import com.glassdoor.recruitment.entity.Job;
import com.glassdoor.recruitment.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/job")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/add-job")
    public ResponseEntity<ApiResponse<?>> addJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.addJob(job));
    }
    @GetMapping("/all-jobs")
    public ResponseEntity<ApiResponse<?>> allJobs(@RequestBody Job job){
        return ResponseEntity.ok(jobService.addJob(job));
    }
    @GetMapping("/company-jobs")
    public ResponseEntity<ApiResponse<?>> companyJobs(@RequestBody Job job){
        return ResponseEntity.ok(jobService.addJob(job));
    }
    @DeleteMapping("/delete-job")
    public ResponseEntity<ApiResponse<?>> deleteJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.addJob(job));
    }
    @PutMapping("/update-job")
    public ResponseEntity<ApiResponse<?>> updateJob(@RequestBody Job job){
        return ResponseEntity.ok(jobService.addJob(job));
    }

}
