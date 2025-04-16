package com.glassdoor.authentication.repository;

import com.glassdoor.authentication.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

//public interface UserRepository extends MongoRepository<User,ٍString> {
//
//    Optional<User> findByEmail(String email);
//}

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}