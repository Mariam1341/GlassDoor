package com.glassdoor.backend.controller;


import com.glassdoor.backend.service.GeminiAIService;
import com.glassdoor.backend.dto.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private GeminiAIService geminiAIService;

    @PostMapping("/generate-exam")
    public ApiResponse<String> generateExam(@RequestBody String prompt) {
        try {
            String result = geminiAIService.generateExamFromPrompt(prompt);
            return new ApiResponse<>(true, "Exam generated", result);
        } catch (Exception e) {
            return new ApiResponse<>(false, e.getMessage(), null);
        }
    }
}
