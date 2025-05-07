package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.Company;
import com.glassdoor.backend.entity.JobList;
import com.glassdoor.backend.repository.JobsRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    private JobsRepository jobRepository;

    @Autowired
    public JobService(JobsRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobList> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<JobList> getJobById(String id) {
        return jobRepository.findById(id);
    }

    public JobList createJob(JobList job) {
        return jobRepository.save(job);
    }

    public JobList updateJob(String id, JobList job) {

        return jobRepository.save(job);
    }

    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }

    public List<JobList> getJopByStatus(String status) {
        return jobRepository.findByStatus(status);
    }

    public List<String> findDistinctLocations() {
        return jobRepository.findDistinctLocations();
    }

    public List<String> findDistinctTitles() {
        return jobRepository.findDistinctTitles();
    }

    public List<String> findDistinctEmploymentTypes() {
        return jobRepository.findDistinctEmploymentTypes();
    }

    public List<String> findDistinctSalaryCurrencies() {
        return jobRepository.findDistinctSalaryCurrencies();
    }

    public List<String> findDistinctStatuses() {
        return jobRepository.findDistinctStatuses();
    }

    public List<JobList> findByTitle(String titles) {
        return jobRepository.findByTitle(titles);
    }

    public List<JobList> findByLocation(String location) {

        return jobRepository.findByLocation(location);
    }

    public List<JobList> findByEmploymentType(String types) {
        return jobRepository.findByEmploymentType(types);
    }

    public List<JobList> findBySalaryCurrency(String currency) {

        return jobRepository.findBySalaryCurrency(currency);
    }

    public List<JobList> findbyfilters(String location, String currency, String status, String emplyeetypes,
            String title) {
        return jobRepository.findByFilters(location, currency, status, emplyeetypes, title);
    }

}
