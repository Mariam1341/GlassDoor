package com.glassdoor.backend.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
//    private String id;
    private String userName;
    private String email;
    private String role;


}