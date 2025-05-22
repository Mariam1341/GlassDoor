import React, { useEffect, useState } from "react";
import Suggest from "./Suggest";
import styles from "./After_sign_in_2.module.css";
import axios from "axios";

const SuggestMix = () => {
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dummy data for fallback
  const dummyJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "Jaipur, Rajasthan",
      posted: "3 days ago",
      isFavorite: false,
      logo: "https://via.placeholder.com/50?text=TechCorp",
      skills: ["Java", "Spring", "Docker"],
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "DataTech Solutions",
      location: "Bangalore, Karnataka",
      posted: "2 days ago",
      isFavorite: true,
      logo: "https://via.placeholder.com/50?text=DataTech",
      skills: ["Python", "SQL", "Machine Learning"],
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Innovate Systems",
      location: "Mumbai, Maharashtra",
      posted: "5 days ago",
      isFavorite: false,
      logo: "https://via.placeholder.com/50?text=Innovate",
      skills: ["Agile", "Scrum", "Product Management"],
    },
    {
      id: 4,
      title: "UX Designer",
      company: "DesignCo",
      location: "Hyderabad, Telangana",
      posted: "1 day ago",
      isFavorite: false,
      logo: "https://via.placeholder.com/50?text=DesignCo",
      skills: ["Figma", "UX Design", "Prototyping"],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudNet Technologies",
      location: "Delhi, NCR",
      posted: "4 days ago",
      isFavorite: true,
      logo: "https://via.placeholder.com/50?text=CloudNet",
      skills: ["AWS", "Docker", "Kubernetes"],
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "WebWorks",
      location: "Chennai, Tamil Nadu",
      posted: "6 days ago",
      isFavorite: false,
      logo: "https://via.placeholder.com/50?text=WebWorks",
      skills: ["React", "JavaScript", "CSS"],
    },
  ];

  const fetchUserSkills = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserSkills(response.data.skills || []);
    } catch (err) {
      console.error("Failed to fetch user skills:", err);
      setError("Failed to fetch user profile.");
    }
  };

  const fetchSuggestedJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      setSuggestedJobs(dummyJobs);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching suggested jobs with token:", token);
      const response = await axios.get("http://localhost:8080/api/v1/job/suggested", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setSuggestedJobs(data.length > 0 ? data : dummyJobs);
      setLoading(false);
    } catch (err) {
      const errorMessage = err.response
        ? `Failed to fetch suggested jobs: ${err.response.status} ${err.response.data.message || err.response.statusText}`
        : `Failed to fetch suggested jobs: ${err.message}`;
      setError(errorMessage);
      setSuggestedJobs(dummyJobs);
      setLoading(false);
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUserSkills();
    fetchSuggestedJobs();
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
        <p>Explore open positions related to your current job title and skills</p>
      </div>
      {loading && <div className={styles.loader}>Loading...</div>}
      {error && (
        <div className={styles.error}>
          {error}
          <button
            className={styles.retryButton}
            onClick={() => {
              setError("");
              setLoading(true);
              fetchUserSkills();
              fetchSuggestedJobs();
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
            <p>No suggested jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestMix;