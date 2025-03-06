package com.glassdoor.authentication.service;

import com.glassdoor.authentication.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.glassdoor.authentication.entity.UserEntity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    public List<UserEntity> findAll(){
        return userRepo.findAll();
    };

    public UserEntity findById(Long id){
        return userRepo.findById(id).orElse(null);
    };
    public UserEntity addUser(UserEntity user){
        return userRepo.save(user);
    }

}
