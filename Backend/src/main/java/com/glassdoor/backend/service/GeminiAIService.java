package com.glassdoor.backend.service;



import okhttp3.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class GeminiAIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public String generateExamFromPrompt(String prompt) throws IOException {
        OkHttpClient client = new OkHttpClient();
        ObjectMapper mapper = new ObjectMapper();

        String json = mapper.writeValueAsString(Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{Map.of("text", prompt)})
                }
        ));

        RequestBody body = RequestBody.create(
                json, MediaType.get("application/json; charset=utf-8")
        );

        HttpUrl url = HttpUrl.parse(GEMINI_API_URL).newBuilder()
                .addQueryParameter("key", apiKey)
                .build();

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Gemini API failed: " + response);
            }

            String responseBody = response.body().string();
            Map<?, ?> responseMap = mapper.readValue(responseBody, Map.class);
            var candidates = (java.util.List<?>) responseMap.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                var content = (Map<?, ?>) ((Map<?, ?>) candidates.get(0)).get("content");
                var parts = (java.util.List<?>) content.get("parts");

                Map<?, ?> part = (Map<?, ?>) parts.get(0);
                String examJson = part.get("text").toString();
                return examJson;


            }

            return "No response from Gemini.";
        }
    }
}
