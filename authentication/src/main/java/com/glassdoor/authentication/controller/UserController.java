package com.glassdoor.authentication.controller;

import com.glassdoor.authentication.entity.UserEntity;
import com.glassdoor.authentication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
//@CrossOrigin(value = {"http://localhost:4200", "https://google.com"})
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {

        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id ) {

        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping("/addUser")
    public ResponseEntity<?>  addUser(@RequestBody UserEntity user){
        return ResponseEntity.ok(userService.addUser(user));
    }
}


