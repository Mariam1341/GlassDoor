package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Company;
import com.glassdoor.backend.entity.Job;
import com.glassdoor.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
