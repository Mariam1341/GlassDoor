import React, { useState } from "react";
import styles from "./ExamEditor.module.css";

export const ExamEditor = ({ jobId }) => {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctIndex: 0 }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "text") updated[index].text = value;
    else if (field === "correctIndex") updated[index].correctIndex = parseInt(value);
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctIndex: 0 }
    ]);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/v1/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ jobId, questions })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className={styles.editor}>
      <h2>Create or Edit Exam</h2>
      {questions.map((q, i) => (
        <div key={i} className={styles.questionBlock}>
          <label>Question {i + 1}</label>
          <input
            type="text"
            value={q.text}
            onChange={(e) => handleQuestionChange(i, "text", e.target.value)}
            placeholder="Enter question"
          />
          {q.options.map((opt, j) => (
            <input
              key={j}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(i, j, e.target.value)}
              placeholder={`Option ${j + 1}`}
            />
          ))}
          <label>Correct Answer Index (0-3)</label>
          <input
            type="number"
            min="0"
            max="3"
            value={q.correctIndex}
            onChange={(e) => handleQuestionChange(i, "correctIndex", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSave}>Save Exam</button>
    </div>
  );
};
