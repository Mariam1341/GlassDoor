import React from "react";
import styles from "./After_sign_in_2.module.css";
import { FaStar } from "react-icons/fa";

const Recent = ({ items }) => {
  return (
    <div className={styles.recentItems}>
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className={styles.recentItem}>
            <img src={item.img} alt={item.company} className={styles.recentImage} />
            <div className={styles.recentDetails}>
              <div className={styles.recentRating}>
                {item.rating} <FaStar className={styles.starIcon} />
              </div>
              <h3 className={styles.recentPosition}>{item.position}</h3>
              <p className={styles.recentCompany}>{item.company}</p>
              <p className={styles.recentLocation}>{item.location}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No recent items available.</p>
      )}
    </div>
  );
};

export default Recent;