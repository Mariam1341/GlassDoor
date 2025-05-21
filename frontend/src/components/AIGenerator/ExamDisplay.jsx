import React from "react";
import styles from "./AIGenerator.module.css";

export const ExamDisplay = ({ content }) => {
  return (
    <div className={styles.examBox}>
      <h3>Generated Exam</h3>
      <pre className={styles.examContent}>{content}</pre>
    </div>
  );
};
