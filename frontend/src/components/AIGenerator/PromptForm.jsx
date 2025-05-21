import React, { useState } from "react";
import styles from "./AIGenerator.module.css";
import { ExamDisplay } from "./ExamDisplay";
import { ExamForm } from "./ExamForm";

export const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [exam, setExam] = useState("");

  const formate ={
    "examTitle": "Your Exam Title",
    "questions": [
      {
        "questionText": "Question?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "Correct Option",
        "explanation": "Short explanation."
      }
    ]
  };
  
  const inst= "The response should be only valid raw JSON. Do not include markdown, triple backticks, or any explanations.also don't make any words before or after {}  The JSON structure must look like this:";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setPrompt(prompt)
    let editedPrompt = "Generate a multiple-choice exam based on this prompt" + prompt+ inst + JSON.stringify(formate )

    const res = await fetch("http://localhost:8080/api/ai/generate-exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: editedPrompt }),
    });

    const data = await res.json();


    setExam(data.data || "No exam returned.");
    // console.log(data.data);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AI Exam Generator</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Enter your exam prompt</label>
        <textarea
          rows="5"
          placeholder="e.g. Create a Java exam with 3 MCQs"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" className={styles.btn}>Generate Exam</button>
      </form>

      {exam && <ExamForm examDataString={exam}  />}
    </div>
  );
};
