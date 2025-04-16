package com.glassdoor.authentication.service;

import com.glassdoor.authentication.dto.AuthenticationRequest;
import com.glassdoor.authentication.dto.AuthenticationResponse;
import com.glassdoor.authentication.dto.UserDTO;
import com.glassdoor.authentication.dto.common.ApiResponse;
import com.glassdoor.authentication.entity.User;
import com.glassdoor.authentication.exception.CustomAuthenticationExceptions;
import com.glassdoor.authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {


    private final UserRepository userRepository;
    private final JwtService jwtService;


    // it's my implementation to make sure that it will be suitable for this project
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user =	userRepository.findByEmail(username);

        if (!user.isPresent()) {

            throw new UsernameNotFoundException("This User Not found with selected email :- " + username);
        }

        return user.get();
    }
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .build();
    }

    private User getUser(String token){
        String email = jwtService.extractUserName(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }
    public ApiResponse<UserDTO> getUserProfile(String token) {
        User user = getUser(token);

        return ApiResponse.<UserDTO>builder()
                .success(true)
                .message("User profile retrieved")
                .data(convertToDTO(user))
                .build();
    }

    public ApiResponse<UserDTO> updateUser(String token, UserDTO request) {
       var user = getUser(token);

        // data to update
        user.setName(request.getUserName());

        userRepository.save(user);

        UserDTO dto = convertToDTO(user);

        return ApiResponse.<UserDTO>builder()
                .success(true)
                .message("User updated successfully")
                .data(dto)
                .build();
    }
}
