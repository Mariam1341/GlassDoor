package com.glassdoor.backend.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Data
@Document(collection = "companies")
public class Company {
    @Id
    private String id;
    private String name;
    private String website;
    private String totalEmployee;
    private String salaryRange;
    private String revenue;
    private String foundedYear;
    private String status;
    private String companyType;
    private String ceo;
    private String logo;  // base64 or image URL
    private double rating;
    private String brief;
}
