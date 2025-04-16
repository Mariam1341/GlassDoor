package com.microservices.GlassDoor.repository;

import com.microservices.GlassDoor.entity.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyRepository extends MongoRepository<Company, String> {

}
