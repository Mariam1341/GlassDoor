package com.glassdoor.authentication.controller;


import com.glassdoor.authentication.dto.AuthenticationResponse;
import com.glassdoor.authentication.dto.UserDTO;
import com.glassdoor.authentication.dto.common.ApiResponse;
import com.glassdoor.authentication.entity.User;
import com.glassdoor.authentication.repository.UserRepository;
import com.glassdoor.authentication.service.JwtService;
import com.glassdoor.authentication.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<?>> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(userService.getUserProfile(token));
    }
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<?>> updateUser(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UserDTO request) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok(userService.updateUser(token, request));
    }
}
