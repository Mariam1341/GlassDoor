package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.ExamSession;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamSessionRepository extends MongoRepository<ExamSession, String> {
}
