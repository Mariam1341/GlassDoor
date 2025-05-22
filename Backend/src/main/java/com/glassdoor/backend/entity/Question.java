package com.glassdoor.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    private String questionText;
    private List<String> options;
    private String correctAnswer;
    private String explanation;
}
