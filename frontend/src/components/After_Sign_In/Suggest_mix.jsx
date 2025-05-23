import React, { useEffect, useState } from "react";
import Suggest from "./Suggest";
import styles from "./After_sign_in_2.module.css";
import axios from "axios";

const SuggestMix = () => {
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserSkills = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return false;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const skills = response.data.profile?.skills || [];
      setUserSkills(skills);
      return skills;
    } catch (err) {
      console.error("Failed to fetch user skills:", err);
      setError("Failed to fetch user profile.");
      return false;
    }
  };

  const fetchSuggestedJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      setSuggestedJobs([]);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching suggested jobs");
      const response = await axios.get("http://localhost:8080/api/v1/job/suggested", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      const data = Array.isArray(response.data) ? response.data : [];
      // Map Job entity fields to match Suggest component
      const mappedJobs = data.map((job) => ({
        id: job.id,
        title: job.title,
        company: job.companyName,
        location: job.location,
        posted: formatPostedDate(job.postedDate),
        isFavorite: job.isFavorite || false,
        logo: job.imgUrl,
        skills: job.requiredSkills,
      }));
      setSuggestedJobs(mappedJobs);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response
        ? `Failed to fetch suggested jobs: ${err.response.status} ${err.response.data.message || err.response.statusText}`
        : `Failed to fetch suggested jobs: ${err.message}`;
      setError(errorMessage);
      setSuggestedJobs([]);
      setLoading(false);
      console.error("Fetch error:", err);
    }
  };

  // Format postedDate to "X days ago"
  const formatPostedDate = (postedDate) => {
    if (!postedDate) return "Unknown";
    const posted = new Date(postedDate);
    const now = new Date();
    const daysDiff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    return daysDiff === 0 ? "Today" : `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    const loadData = async () => {
      const skills = await fetchUserSkills();
      if (skills !== false) {
        await fetchSuggestedJobs();
      } else {
        setSuggestedJobs([]);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleFavorite = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const currentJob = suggestedJobs.find((j) => j.id === jobId);
      await axios.post(
        "http://localhost:8080/api/v1/user/favorite-job",
        { jobId, enabled: !currentJob.isFavorite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuggestedJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, isFavorite: !j.isFavorite } : j))
      );
    } catch (err) {
      const errorMessage = err.response
        ? `Failed to toggle favorite: ${err.response.status} ${err.response.data.message || err.response.statusText}`
        : `Failed to toggle favorite: ${err.message}`;
      setError(errorMessage);
      console.error("Toggle favorite error:", err);
    }
  };

  // Compute matched skills for each job
  const getMatchedSkills = (jobSkills) => {
    if (!jobSkills || !Array.isArray(jobSkills) || !Array.isArray(userSkills)) {
      return { matched: [], unmatched: jobSkills || [] };
    }
    const matched = jobSkills.filter((skill) => userSkills.includes(skill));
    const unmatched = jobSkills.filter((skill) => !userSkills.includes(skill));
    return { matched, unmatched };
  };

  return (
    <div className={styles.suggestCard}>
      <div className={styles.suggestHeader}>
        <h2>Suggested Jobs</h2>
        <p>Explore open positions related to your skills</p>
      </div>
      {loading && <div className={styles.loader}>Loading...</div>}
      {error && (
        <div className={styles.error}>
          {error}
          <button
            className={styles.retryButton}
            onClick={async () => {
              setError("");
              setLoading(true);
              const skills = await fetchUserSkills();
              if (styles !== false) {
                await fetchSuggestedJobs();
              } else {
                setSuggestedJobs([]);
                setLoading(false);
              }
            }}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && (
        <div className={styles.suggestList}>
          {suggestedJobs.length > 0 ? (
            suggestedJobs.map((job) => {
              const { matched, unmatched } = getMatchedSkills(job.skills);
              return (
                <Suggest
                  key={job.id}
                  job={job}
                  matchedSkills={matched}
                  unmatchedSkills={unmatched}
                  onToggleFavorite={() => toggleFavorite(job.id)}
                />
              );
            })
          ) : (
            <p>No suggested jobs found matching your skills.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestMix;