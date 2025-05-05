package com.glassdoor.recruitment.entity;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "jopList")
public class JopList {

    @Id
    private String id;

    private String companyId;
    private String hrId;

    private String title;
    private String description;
    private String location;
    private String employmentType; // Full-time, Part-time, etc.

    private int salaryMin;
    private int salaryMax;
    private String salaryCurrency;

    private List<String> requirements; // Skills list
    private LocalDateTime postedAt;
    private String status; // Active, Closed




}
