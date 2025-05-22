package com.glassdoor.backend.service;

import com.glassdoor.backend.dto.UserDTO;
import com.glassdoor.backend.dto.common.ApiResponse;
import com.glassdoor.backend.entity.User;
import com.glassdoor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    public Optional<User> getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email);
    }

    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
//                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getName())
                .role(user.getRole())
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

    public ApiResponse<User> updateUserProfile(String token, User userUpdate) {
        // Extract email from token to identify the user
        String email = jwtService.extractUserName(token);
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Update top-level user fields (excluding id and role for security)
        if (userUpdate.getName() != null) {
            existingUser.setName(userUpdate.getName());
        }
        if (userUpdate.getEmail() != null) {
            existingUser.setEmail(userUpdate.getEmail());
        }
        if (userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()) {
            existingUser.setPassword(userUpdate.getPassword()); // Assume password is hashed by the controller
        }

        // Update profile fields
        if (userUpdate.getProfile() != null) {
            // Initialize profile if null
            if (existingUser.getProfile() == null) {
                existingUser.setProfile(new User.Profile());
            }

            User.Profile existingProfile = existingUser.getProfile();
            User.Profile profileUpdate = userUpdate.getProfile();

            if (profileUpdate.getFirstName() != null) {
                existingProfile.setFirstName(profileUpdate.getFirstName());
            }
            if (profileUpdate.getLastName() != null) {
                existingProfile.setLastName(profileUpdate.getLastName());
            }
            if (profileUpdate.getSkills() != null) {
                existingProfile.setSkills(profileUpdate.getSkills());
            }
            if (profileUpdate.getResumeUrl() != null) {
                existingProfile.setResumeUrl(profileUpdate.getResumeUrl());
            }
            if (profileUpdate.getCompanyId() != null) {
                existingProfile.setCompanyId(profileUpdate.getCompanyId());
            }
        }

        // Save the updated user to the database
        User updatedUser = userRepository.save(existingUser);

        return ApiResponse.<User>builder()
                .success(true)
                .message("User profile updated successfully")
                .data(updatedUser)
                .build();
    }
}
