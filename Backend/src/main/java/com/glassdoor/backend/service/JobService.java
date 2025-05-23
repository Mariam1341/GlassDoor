package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    @Autowired
    private JobRepository jobRepository;

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
            app.setHasPendingExam(true);
            applicationRepository.save(app);
        }
        for (CandidateApplication app : candidates) {
            app.setHasPendingExam(true);
            applicationRepository.save(app);
            mailService.sendExamNotification(app.getCandidateEmail(), jobId);
        }

    }
    public ApiResponse<List<Job>> getAllJobs() {
        List<Job> list = jobRepository.findAll();
        return new ApiResponse<>(true, "Jobs fetched", list);
    }

}
