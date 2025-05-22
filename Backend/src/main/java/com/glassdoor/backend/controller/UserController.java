package com.glassdoor.backend.controller;


import com.glassdoor.backend.dto.UserDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.service.UserService;
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

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        return userService.getCurrentUser()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).build());
    }


    // recruiter will remove job post

//    @PostMapping("/{id}/removejob")
//    public ResponseEntity<ApiResponse<?>> removeJob(@PathVariable Long id, @RequestBody String jobId) {
//        return new ResponseEntity<>(userService.removeJobFromRecruiter(id, jobId), HttpStatus.OK);
//    }
}
