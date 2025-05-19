package com.glassdoor.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.glassdoor.backend.dto.JobDTO;
import com.glassdoor.backend.dto.JobMapper;
import com.glassdoor.backend.entity.JobList;
import com.glassdoor.backend.service.JobService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class JobController {

    @Autowired
    private JobService service;

    @GetMapping("/allJobs")
    public List<JobDTO> getAllJobs() {
        return service.getAllJobs()
                .stream()
                .map(JobMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable String id) {
        return service.getJobById(new String(id))
                .map(JobMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/addJob")
    public ResponseEntity<JobDTO> createJob(@RequestBody JobDTO jobDTO) {
        JobList job = JobMapper.toEntity(jobDTO);
        job.setPostedAt(LocalDateTime.now());
 
        return ResponseEntity.ok(JobMapper.toDTO(service.createJob(job)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable String id, @RequestBody JobDTO jobDTO) {
        JobList updated = JobMapper.toEntity(jobDTO);
        JobList job = service.updateJob(new String(id), updated);
        return ResponseEntity.ok(JobMapper.toDTO(job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        service.deleteJob(new String(id));
        return ResponseEntity.noContent().build();
    }

    // Get jobs by status
    @GetMapping("/status/{status}")
    public List<JobDTO> getJobsByStatus(@PathVariable("status") String status) {
        List<JobList> jobs = service.getJopByStatus(status);
        return jobs.stream()
                .map(JobMapper::toDTO)
                .collect(Collectors.toList());
    };
    // List<JobList> findBySalaryCurrency(String salaryCurrency);

    @GetMapping("/titles/{titles}")
    public List<JobList> finbyTitles(@PathVariable("titles") String titles) {
        return service.findByTitle(titles);

    }

    @GetMapping("/locations/{location}")
    public List<JobList> findByLocation(@PathVariable("location") String location) {

        return service.findByLocation(location);

    }

    @GetMapping("/types/{types}")
    public List<JobList> findByEmploymentType(@PathVariable("types") String types) {
        return service.findByEmploymentType(types);
    }

    @GetMapping("/currency/{currency}")
    public List<JobList> findBySalaryCurrency(@PathVariable("currency") String currency) {
        return service.findBySalaryCurrency(currency);
    }

    @GetMapping("/allLocations")
    public List<String> findDistinctLocations() {
        return service.findDistinctLocations();
    }

    @GetMapping("/allTitles")
    public List<String> findDistinctTitles() {
        return service.findDistinctTitles();
    }

    @GetMapping("/allEmplymentTypes")
    public List<String> findDistinctEmploymentTypes() {
        return service.findDistinctEmploymentTypes();
    }

    @GetMapping("/allCurrencies")
    public List<String> findDistinctSalaryCurrencies() {
        return service.findDistinctSalaryCurrencies();
    }

    @GetMapping("/allStatus")
    public List<String> findDistinctStatuses() {
        return service.findDistinctStatuses();
    }

    @GetMapping("/filter")
    public List<JobList> filterJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String currency,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String title) {
        return service.findbyfilters(location, currency, status, type, title);
    }

}
