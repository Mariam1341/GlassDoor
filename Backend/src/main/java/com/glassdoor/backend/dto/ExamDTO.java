package com.glassdoor.backend.dto;

import com.glassdoor.backend.entity.Question;
import lombok.Data;

import java.util.List;

@Data
public class ExamDTO {
    private String examTitle;
    private String jobId;
    private List<Question> questions;
}
