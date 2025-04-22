package com.glassdoor.recruitment.service;

import com.glassdoor.recruitment.dto.common.ApiResponse;
import com.glassdoor.recruitment.entity.Company;
import com.glassdoor.recruitment.entity.Job;
import com.glassdoor.recruitment.repository.JobRepository;
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
