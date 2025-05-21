package com.glassdoor.backend.dto;

import lombok.Data;

import java.util.Map;

@Data
public class ExamSubmissionDTO {
    private String jobId;
    private Map<Integer, String> answers;
}
