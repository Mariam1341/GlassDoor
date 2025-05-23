package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.JobApplication;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobApplicationRepository extends MongoRepository<JobApplication, ObjectId> {
}
