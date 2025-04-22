package com.glassdoor.authentication.dto;


import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
//    private String id;
    private String userName;
    private String email;


}