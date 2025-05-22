import React, { useState , useEffect} from 'react';
import styles from "./ExamForm.module.css";


export const ExamForm = ({ examDataString , jobId}) => {
  const [answers, setAnswers] = useState({});
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!examDataString) {
      setError("No exam data provided");
      setLoading(false);
      return;
    }

    try {
      let cleaned = examDataString
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      cleaned = cleaned.replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');
      
      const parsedData = JSON.parse(cleaned);
      setExamData(parsedData);
      setError(null);
    } catch (error) {
      console.error("Failed to parse exam data:", error);
      setError("Invalid exam data format");
    } finally {
      setLoading(false);
    }
  }, [examDataString]);

  const handleChange = (index, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const jobId = "682e3f65b559643442716e86"; // Hardcoded for now
      const result = await saveExam(examData, jobId);
      console.log('Exam saved successfully:', result);
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  const saveExam = async (examData, jobId) => {
    console.log("Exam data to save:", examData);
    
    // Validate all required fields
    if (!examData || !examData.examTitle || !examData.questions || !examData.questions.length) {
      throw new Error(`Missing required fields: ${
        !examData ? 'Exam data' : 
        !examData.examTitle ? 'Exam title' : 
        !examData.questions ? 'Questions array' : 
        'At least one question'
      }`);
    }

    // Validate each question
    const invalidQuestions = examData.questions.filter(q => 
      !q.questionText || !q.options || !q.options.length || !q.correctAnswer
    );
    
    if (invalidQuestions.length) {
      throw new Error(`Invalid questions at indexes: ${invalidQuestions.map((_, i) => i)}`);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const requestBody = {
      examTitle: examData.examTitle,
      jobId: jobId,
      questions: examData.questions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || ""
      }))
    };

    const response = await fetch("http://localhost:8080/v1/api/exams/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save exam");
    }

    return await response.json();
  };

  if (loading) return <p>Loading exam data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!examData || !examData.questions) return <p>No exam questions available.</p>;

  return (
    <div className={styles.examForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>{examData.examTitle || 'Exam'}</h2>
        {examData.questions.map((q, index) => (
          <div key={index} className={styles.questionBlock}>
            <p style={{fontSize: '20px'}}>
              <strong>{index + 1}. {q.questionText}</strong>
            </p>
            {q.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleChange(index, option)}
                    style={{marginRight: '10px'}}
                  />
                  {option}
                </label>
              </div>
            ))}
            {q.correctAnswer && (
              <p className={styles.correctAnswer}>
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
            )}
          </div>
        ))}
        <button type="submit" className={styles.btn}>Send</button>
      </form>
    </div>
  );
};

export default ExamForm;