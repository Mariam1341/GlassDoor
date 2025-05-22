package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepository extends MongoRepository<Job, String> {
}
