package com.glassdoor.authentication.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "users")
@Data
public class UserEntity {

    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
    private Role role;

}
