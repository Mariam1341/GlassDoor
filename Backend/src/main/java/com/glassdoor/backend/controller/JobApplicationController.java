package com.glassdoor.backend.controller;

import com.glassdoor.backend.entity.JobApplication;
import com.glassdoor.backend.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/job-applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    private final JobApplicationService service;

    @PostMapping
    public ResponseEntity<JobApplication> createApplication(@RequestBody JobApplication application) {
        return ResponseEntity.ok(service.createApplication(application));
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable ObjectId id) {
        return service.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateApplication(@PathVariable ObjectId id, @RequestBody JobApplication update) {
        return service.updateApplication(id, update)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable ObjectId id) {
        if (service.deleteApplication(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
