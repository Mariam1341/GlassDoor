package com.glassdoor.authentication.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.glassdoor.authentication.entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long>{


}
