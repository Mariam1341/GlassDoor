package com.glassdoor.authentication.config;

import java.util.HashSet;
import java.util.Set;

import com.glassdoor.authentication.entity.Role;
import com.glassdoor.authentication.entity.UserEntity;
import com.glassdoor.authentication.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StartUpApp implements CommandLineRunner {

    private final UserService userService;



    @Override
    public void run(String... args) throws Exception {



        if (userService.findAll().isEmpty()) {

            userService.addUser(new UserEntity(null,"Nour Shaheen", "nour", "123", Role.ADMIN));

            userService.addUser(new UserEntity( null,"Ali Mohamed", "ali", "123",Role.RECRUITER));

            userService.addUser(new UserEntity( null,"Ahmed Ebraheem", "ahmed", "123", Role.JOB_SEEKER ));
        }

    }

}