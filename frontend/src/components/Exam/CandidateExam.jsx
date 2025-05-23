import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CandidateExam = () => {
  const { jobId } = useParams(); 
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/candidate/exam/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExam(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load exam or you are not allowed.");
        setLoading(false);
      }
    };

    fetchExam();
  }, [jobId, token]);

  const handleChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/candidate/exam/submit",
        {
          jobId,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setScore(res.data.data); 
      console.log(res.data.data)
      if (!res.data.success) {
      console.error(res.data.message);
      setError(res.data.message);
}
    } catch (err) {
      console.error(err);
      setError("Failed to submit your exam.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!exam) return <p>No exam found.</p>;

  return (
    <div className={styles.examWrapper}>
      <h2>{exam.examTitle || "Job Exam"}</h2>
      <form onSubmit={handleSubmit} className={styles.examForm}>
        {exam.questions.map((q, index) => (
          <div key={index} className={styles.questionBlock}>
            <p><strong>{index + 1}. {q.questionText}</strong></p>
            {q.options.map((option, i) => (
              <div key={i} className={styles.option}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleChange(index, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default CandidateExam;
