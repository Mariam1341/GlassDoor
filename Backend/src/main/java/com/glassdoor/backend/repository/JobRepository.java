package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface JobRepository extends MongoRepository<Job, String> {
    @Query("{ 'requiredSkills': { $in: ?0 }, 'isActive': true }")
    List<Job> findByRequiredSkillsIn(List<String> skills);
}
