package com.glassdoor.backend.repository;

import com.glassdoor.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

//public interface UserRepository extends MongoRepository<User,ٍString> {
//
//    Optional<User> findByEmail(String email);
//}

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}