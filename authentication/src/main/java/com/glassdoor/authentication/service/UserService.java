package com.glassdoor.authentication.service;

import com.glassdoor.authentication.entity.User;
import com.glassdoor.authentication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {


    private final UserRepository userRepository;

    // it's my implementation to make sure that it will be utibul for this project
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user =	userRepository.findByEmail(username);

        if (!user.isPresent()) {

            throw new UsernameNotFoundException("This User Not found with selected email :- " + username);
        }

        return user.get();
    }
}
