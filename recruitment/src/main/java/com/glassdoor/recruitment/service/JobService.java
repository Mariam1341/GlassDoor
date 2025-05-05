package com.glassdoor.recruitment.service;

 
import com.glassdoor.recruitment.entity.JopList;
import com.glassdoor.recruitment.repository.JobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
 

import java.util.List;
import java.util.Optional;






@Service
public class JobService {

    private JobsRepository jobRepository;


    @Autowired
    public JobService(JobsRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JopList> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<JopList> getJobById(String id) {
        return jobRepository.findById(id);
    }

    public JopList createJob(JopList job) {
        return jobRepository.save(job);
    }

    public JopList updateJob(String id, JopList job) {

        return jobRepository.save(job);
    }

    public void deleteJob(String id) {
        jobRepository.deleteById(id);
    }

    public List<JopList> getJopByStatus(String status) {
        return jobRepository.findByStatus(status);
    }


    public List<String> findDistinctLocations(){
        return jobRepository.findDistinctLocations();
    }
    public List<String> findDistinctTitles(){
        return jobRepository.findDistinctTitles();
    }
    public List<String>findDistinctEmploymentTypes(){
        return jobRepository.findDistinctEmploymentTypes();
    }
    public List<String>findDistinctSalaryCurrencies(){
        return jobRepository.findDistinctSalaryCurrencies();
    }
    public List<String> findDistinctStatuses(){
        return jobRepository.findDistinctStatuses();
    }

    public List<JopList> findByTitle(String titles) {
        return jobRepository.findByTitle(titles);
    }

    public List<JopList> findByLocation(String location) {

        return jobRepository.findByLocation(location);
    }

    public List<JopList> findByEmploymentType(String types) {
        return jobRepository.findByEmploymentType(types);
    }

    public List<JopList> findBySalaryCurrency(String currency) {

        return jobRepository.findBySalaryCurrency(currency);
    }

    public List<JopList> findbyfilters (String location,String currency ,String status , String emplyeetypes ,String title){
        return jobRepository.findByFilters(location,currency,status,emplyeetypes,title);
    }

}
