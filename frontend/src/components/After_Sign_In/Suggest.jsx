import React from "react";
import styles from "./After_sign_in_2.module.css";
import { FaHeart } from "react-icons/fa";

const Suggest = ({ job, onToggleFavorite }) => {
  return (
    <div className={styles.suggestItem}>
      <img src={job.logo} alt={`${job.company} logo`} className={styles.suggestLogo} />
      <div className={styles.suggestDetails}>
        <div className={styles.suggestTitle}>
          <h3>{job.title}</h3>
          <button
            className={`${styles.favoriteButton} ${job.isFavorite ? styles.favorited : ""}`}
            onClick={onToggleFavorite}
            aria-label={job.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart />
          </button>
        </div>
        <div className={styles.suggestInfo}>
          <span>{job.company}</span>
          <span>{job.location}</span>
        </div>
        <div className={styles.suggestPosted}>
          <span>{job.posted}</span>
        </div>
      </div>
    </div>
  );
};

export default Suggest;