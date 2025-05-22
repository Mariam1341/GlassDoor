package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllJobs(){
        return  ResponseEntity.ok(jobService.getAllJobs());
    }

    @PostMapping("/post")
    public ResponseEntity<Job> postJob(@RequestBody Job job) {
        return ResponseEntity.ok(jobService.postJob(job));
    }

    @GetMapping("/suggested")
    public ResponseEntity<List<Job>> getSuggestedJobs(@RequestParam List<String> skills) {
        return ResponseEntity.ok(jobService.getSuggestedJobs(skills));
    }
}
