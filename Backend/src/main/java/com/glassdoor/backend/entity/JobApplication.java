package com.glassdoor.backend.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@NoArgsConstructor

@AllArgsConstructor
@Data
@Document(collection = "job_applications")
public class JobApplication {

    @Id
    private ObjectId id;

    private String name;
    private String email;
    private String phone;
    private String qualification;
    private String resumeLink;
    private String status;
    private List<String> skills;

    private ObjectId jobId; // Reference to the related Job
    private ObjectId userId; // Add this field to link a user to this application

}
