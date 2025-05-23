package com.glassdoor.backend.service;

import com.glassdoor.backend.entity.JobApplication;
import com.glassdoor.backend.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplication createApplication(JobApplication application) {
        return repository.save(application);
    }

    public List<JobApplication> getAllApplications() {
        return repository.findAll();
    }

    public Optional<JobApplication> getApplicationById(ObjectId id) {
        return repository.findById(id);
    }

    public Optional<JobApplication> updateApplication(ObjectId id, JobApplication update) {
        return repository.findById(id).map(app -> {
            app.setStatus(update.getStatus());
            app.setResumeLink(update.getResumeLink());
            app.setSkills(update.getSkills());
            return repository.save(app);
        });
    }

    public boolean deleteApplication(ObjectId id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

}

