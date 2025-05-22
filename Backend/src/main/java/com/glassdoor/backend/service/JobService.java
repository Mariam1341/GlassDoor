package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.common.ApiResponse;

import com.glassdoor.backend.entity.CandidateApplication;
import com.glassdoor.backend.entity.Company;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.CandidateApplicationRepository;
import com.glassdoor.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CandidateApplicationRepository applicationRepository;



    @Autowired
    private UserService userService;

    public ApiResponse<Job>  addJob(Job job){
        jobRepository.save(job);
        return ApiResponse.<Job>builder()
                .success(true)
                .message("Job been added Successfully")
                .data(job)
                .build();
    }





    public void assignExamToJob(String jobId, String examId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setExamId(examId);
        jobRepository.save(job);


        List<CandidateApplication> candidates = applicationRepository.findByJobId(jobId);
        for (CandidateApplication app : candidates) {
            app.setHasPendingExam(true); // optional field
            applicationRepository.save(app);
        }
    }
    public ApiResponse<List<Job>> getAllJobs() {
        List<Job> list = jobRepository.findAll();
        return new ApiResponse<>(true, "Jobs fetched", list);

    }

    public Job postJob(Job job) {
        User currentUser = userService.getCurrentUser()
                .orElseThrow(() -> new AccessDeniedException("User not authenticated"));
        if (!"RECRUITER".equals(currentUser.getRole())) {
            throw new AccessDeniedException("Only recruiters can post jobs");
        }
        job.setPostedBy(currentUser.getId());
        job.setCompanyId(currentUser.getProfile().getCompanyId());
        job.setActive(true);
        job.setPostedDate(LocalDateTime.now());
        return jobRepository.save(job);
    }

    public List<Job> getSuggestedJobs(List<String> skills) {
        return jobRepository.findByRequiredSkillsIn(skills);
    }

}
