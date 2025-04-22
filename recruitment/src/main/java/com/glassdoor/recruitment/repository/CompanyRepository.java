package com.glassdoor.recruitment.repository;

import com.glassdoor.recruitment.entity.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CompanyRepository extends MongoRepository<Company, String> {
    List<Company> findByNameContainingIgnoreCase(String name);
}
