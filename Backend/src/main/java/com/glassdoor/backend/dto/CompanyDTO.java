package com.glassdoor.backend.dto;



import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO {
    private String id;
    private String name;
    private String website;
    private String totalEmployee;
    private String salaryRange;
    private String revenue;
    private String foundedYear;
    private String createdBy;
    private String status;
    private String companyType;
    private String ceo;
    private String logo;
    private double rating;
}
