package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CompanyRepository extends MongoRepository<Company, String> {
    List<Company> findByNameContainingIgnoreCase(String name);
}
