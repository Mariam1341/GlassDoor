import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Steps from "./Steps";
// add two css files
import styles from "./After_sign_in_2.module.css"

const StepsMix = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile. Please log in again.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={styles.profileCard}>
      {loading && <div className={styles.loader}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && (
        <>
          <div className={styles.profileHeader}>
            <h2>About You</h2>
            <div className={styles.profileInfo}>
              <Link to="/Profile" aria-label="View Profile">
                <img
                  src={
                    userData?.profileImage ||
                    "https://www.glassdoor.com/app/static/img/icons/generic-avatar-50x50@2x.png?v=927f82gd"
                  }
                  alt="Profile"
                  className={styles.profileAvatar}
                />
              </Link>
              <div className={styles.profileDetails}>
                <h3>{userData ? userData.userName : "User Name"}</h3>
                <Link to="/Profile">
                  <button className={styles.profileButton}>Finish Your Profile</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.stepsSection}>
            <h2>Complete These Steps</h2>
            <div className={styles.stepsList}>
              <div className={styles.stepItem}>
                <span>Setup job alert</span>
                <span className={styles.stepStatus}>
                  <i className={styles.checkIcon}></i>
                </span>
              </div>
              <Steps text="Follow 3 companies" isCompleted={false} />
              <Steps text="Write a review" isCompleted={false} />
              <Steps text="Add a Salary" isCompleted={false} />
              <Steps text="Upload a CV" isCompleted={false} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StepsMix;