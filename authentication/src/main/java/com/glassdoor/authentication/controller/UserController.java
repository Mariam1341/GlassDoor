package com.glassdoor.authentication.controller;

import com.glassdoor.authentication.entity.UserEntity;
import com.glassdoor.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
//@CrossOrigin(value = {"http://localhost:4200", "https://google.com"})
public class UserController {

    @Autowired
    private final UserService userService;
//
    @GetMapping("")
    public List<UserEntity> findAll() {

        return userService.findAll() ;
    }
//
    @GetMapping("/{id}")
    public UserEntity findById(@PathVariable Long id ) {

        return userService.findById(id);
    }
//    @PostMapping("/add")
//    public UserEntity addUser(){
//
//    }

}