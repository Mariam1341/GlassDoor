package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.AuthenticationRequest;
import com.glassdoor.backend.dto.AuthenticationResponse;
import com.glassdoor.backend.dto.RegisterRequest;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.exception.CustomAuthenticationExceptions;
import com.glassdoor.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request){
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new CustomAuthenticationExceptions.UserAlreadyExistsException(request.getEmail());
        }
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("JOB_SEEKER")
                .build();
        userRepository.insert(user);
        var jwtToken  = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new CustomAuthenticationExceptions.UserNotFoundException(request.getEmail());
        }
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomAuthenticationExceptions.UserNotFoundException(request.getEmail()));
        var jwtToken  = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }


}
