import React from "react";
import styles from "./After_sign_in_2.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Suggest = ({ job, matchedSkills, unmatchedSkills, onToggleFavorite }) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <img src={job.logo} alt={`${job.company} logo`} className={styles.jobLogo} />
        <div className={styles.jobInfo}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.posted}</p>
        </div>
        <button className={styles.favoriteButton} onClick={onToggleFavorite}>
          {job.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
      <div className={styles.skillsSection}>
        <p className={styles.matchedSkills}>
          <strong>Matched Skills:</strong>{" "}
          {matchedSkills.length > 0 ? matchedSkills.join(", ") : "None"}
        </p>
        <p className={styles.unmatchedSkills}>
          <strong>Other Skills Required:</strong>{" "}
          {unmatchedSkills.length > 0 ? unmatchedSkills.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
};

export default Suggest;