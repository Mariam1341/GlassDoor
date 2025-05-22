package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.CandidateApplication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CandidateApplicationRepository extends MongoRepository<CandidateApplication, String> {
    List<CandidateApplication> findByJobId(String jobId);

    // ✅ Get a single candidate application for a specific job
    Optional<CandidateApplication> findByJobIdAndCandidateEmail(String jobId, String candidateEmail);

    // Optional: Get all applications submitted by a candidate
    List<CandidateApplication> findByCandidateEmail(String candidateEmail);
}
