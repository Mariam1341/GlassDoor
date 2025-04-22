package com.glassdoor.recruitment.repository;

import com.glassdoor.recruitment.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepository extends MongoRepository<Job, String> {
}
