package com.glassdoor.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "exam_sessions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExamSession {
    @Id
    private String id;

    private String userId;
    private String jobId;
    private String examId;

    private List<String> submittedAnswers;
    private Integer score;
    private String status; // ASSIGNED, COMPLETED, GRADED

    private LocalDateTime assignedDate;
    private LocalDateTime completedDate;
}