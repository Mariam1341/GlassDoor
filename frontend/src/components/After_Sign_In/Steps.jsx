import React from "react";
import styles from "./After_sign_in_2.module.css";
import { FaCheckCircle } from "react-icons/fa";

const Steps = ({ text, isCompleted }) => {
  return (
    <div className={`${styles.stepItem} ${isCompleted ? styles.completed : ""}`}>
      <span>{text}</span>
      {isCompleted ? (
        <FaCheckCircle className={styles.checkIcon} />
      ) : (
        <button className={styles.stepButton}>Get Started</button>
      )}
    </div>
  );
};

export default Steps;