package com.glassdoor.backend.controller;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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



    @PostMapping("/{jobId}/assign-exam")
    public ResponseEntity<?> assignExamToJob(
            @PathVariable String jobId,
            @RequestParam String examId
    ) {
        jobService.assignExamToJob(jobId, examId);
        return ResponseEntity.ok("Exam assigned to job successfully.");
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
    public ResponseEntity<List<Job>> getSuggestedJobs(@AuthenticationPrincipal User user) {
        if (user == null || user.getProfile() == null || user.getProfile().getSkills() == null) {
            return ResponseEntity.badRequest().body(List.of());
        }
        return ResponseEntity.ok(jobService.getSuggestedJobs(user.getProfile().getSkills()));
    }
}
