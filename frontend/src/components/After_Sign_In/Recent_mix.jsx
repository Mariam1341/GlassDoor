import React, { useEffect, useState } from "react";
import Recent from "./Recent";
import styles from "./After_sign_in_2.module.css";
import axios from "axios";

const RecentMix = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dummy data as fallback
  const dummySearches = [
    {
      id: 1,
      query: "Full Stack Engineer in Jaipur, Rajasthan",
      jobAlert: false,
      img: "https://via.placeholder.com/50?text=TechCorp",
      rating: 4.5,
      position: "Software Engineer",
      company: "TechCorp",
      location: "Jaipur, Rajasthan",
    },
    {
      id: 2,
      query: "Data Scientist in Bangalore, Karnataka",
      jobAlert: true,
      img: "https://via.placeholder.com/50?text=DataTech",
      rating: 4.2,
      position: "Data Scientist",
      company: "DataTech Solutions",
      location: "Bangalore, Karnataka",
    },
    {
      id: 3,
      query: "Product Manager in Mumbai, Maharashtra",
      jobAlert: false,
      img: "https://via.placeholder.com/50?text=Innovate",
      rating: 4.0,
      position: "Product Manager",
      company: "Innovate Systems",
      location: "Mumbai, Maharashtra",
    },
    {
      id: 4,
      query: "UX Designer in Hyderabad, Telangana",
      jobAlert: true,
      img: "https://via.placeholder.com/50?text=DesignCo",
      rating: 4.3,
      position: "UX Designer",
      company: "DesignCo",
      location: "Hyderabad, Telangana",
    },
    {
      id: 5,
      query: "DevOps Engineer in Delhi, NCR",
      jobAlert: false,
      img: "https://via.placeholder.com/50?text=CloudNet",
      rating: 4.1,
      position: "DevOps Engineer",
      company: "CloudNet Technologies",
      location: "Delhi, NCR",
    },
  ];
  const fetchRecentSearches = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setRecentSearches(dummySearches);
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching recent searches with token:", token);
        const response = await axios.get("http://localhost:3000/api/v1/user/recent-searches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setRecentSearches(data.length > 0 ? data : dummySearches);
        setLoading(false);
      } catch (err) {
        const errorMessage = err.response
          ? `Failed to fetch recent searches: ${err.response.status} ${err.response.data.message || err.response.statusText}`
          : `Failed to fetch recent searches: ${err.message}`;
        setError(errorMessage);
        setRecentSearches(dummySearches);
        setLoading(false);
        console.error("Fetch error:", err);
      }
    };

  useEffect(() => {
    

    fetchRecentSearches();
  }, []);

  const toggleJobAlert = async (searchId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const currentSearch = recentSearches.find((s) => s.id === searchId);
      await axios.post(
        "http://localhost:3000/api/v1/user/job-alert",
        { searchId, enabled: !currentSearch.jobAlert },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecentSearches((prev) =>
        prev.map((s) => (s.id === searchId ? { ...s, jobAlert: !s.jobAlert } : s))
      );
    } catch (err) {
      const errorMessage = err.response
        ? `Failed to toggle job alert: ${err.response.status} ${err.response.data.message || err.response.statusText}`
        : `Failed to toggle job alert: ${err.message}`;
      setError(errorMessage);
      console.error("Toggle job alert error:", err);
    }
  };

  return (
    <div className={styles.recentCard}>
      <h2 className={styles.recentHeader}>Recent Searches</h2>
      {loading && <div className={styles.loader}>Loading...</div>}
      {error && (
        <div className={styles.error}>
          {error}
          <button
            className={styles.retryButton}
            onClick={() => {
              setError("");
              setLoading(true);
              fetchRecentSearches();
            }}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && (
        <>
          <div className={styles.searchList}>
            {recentSearches.length > 0 ? (
              recentSearches.map((search) => (
                <div key={search.id} className={styles.searchItem}>
                  <h3>{search.query}</h3>
                  <div className={styles.jobAlertToggle}>
                    <span>Job Alert</span>
                    <label className={styles.toggleSwitch}>
                      <input
                        type="checkbox"
                        checked={search.jobAlert}
                        onChange={() => toggleJobAlert(search.id)}
                        aria-label={`Toggle job alert for ${search.query}`}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent searches found.</p>
            )}
          </div>
          <div className={styles.recentList}>
            <Recent items={recentSearches} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecentMix;