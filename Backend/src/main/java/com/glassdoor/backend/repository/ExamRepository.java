package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends MongoRepository<Exam, String> {
    List<Exam> findByJobId(String jobId);
}
