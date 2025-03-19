package com.glassdoor.authentication.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle all authentication-related exceptions
    @ExceptionHandler(CustomAuthenticationExceptions.AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(
            CustomAuthenticationExceptions.AuthenticationException ex
    ) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    // Example: Specific handling for duplicate users (optional)
    @ExceptionHandler(CustomAuthenticationExceptions.UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExists(
            CustomAuthenticationExceptions.UserAlreadyExistsException ex
    ) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
}

