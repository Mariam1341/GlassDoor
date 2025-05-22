package com.glassdoor.backend.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Data
@Document(collection = "jobs")
public class Job {
    @Id
    private String id;

    private String companyName;
    private String location;
    private String title;
    private String description;
    private String salaryRange;
    private String examId;
    private String prerequisite;



}
