import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Steps from "./Steps";
import { AuthContext } from "../../context/AuthContext";
import styles from "./After_sign_in_2.module.css";

const StepsMix = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("StepsMix - Token:", token);
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        history.push("/SignIn");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("StepsMix - User data:", response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile. Please log in again.");
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          history.push("/SignIn");
        }
        console.error("StepsMix - Error:", err.response?.status, err.response?.data);
      }
    };

    fetchProfile();
  }, [history]);

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
                    user?.profileImage ||
                    "https://www.glassdoor.com/app/static/img/icons/generic-avatar-50x50@2x.png?v=927f82gd"
                  }
                  alt="Profile"
                  className={styles.profileAvatar}
                />
              </Link>
              <div className={styles.profileDetails}>
                <h3>{user ? user.userName : "User Name"}</h3>
                <Link to="/Profile" className={styles.profileButton}>
                  Finish Your Profile
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.stepsSection}>
            <h2>Complete These Steps</h2>
            <div className={styles.stepsList}>
              <div className={styles.stepItem}>
                <span>Setup job alert</span>
                <span className={styles.stepStatus}>✔</span>
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