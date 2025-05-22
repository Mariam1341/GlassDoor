package com.glassdoor.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "candidate_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateApplication {
    @Id
    private String id;
    private String jobId;
    private String candidateEmail;

    private boolean hasPendingExam;
    private boolean hasTakenExam;
    private int score;
}
