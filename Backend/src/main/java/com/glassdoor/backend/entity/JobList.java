package com.glassdoor.backend.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Data
@Document(collection = "jopList")
public class JobList {

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
