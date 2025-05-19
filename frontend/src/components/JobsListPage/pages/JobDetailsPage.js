import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Header from '../components/Header';
import jobsApi from '../api/jobsApi';
import { formatDate } from '../utils/formatUtils';
import '../styles/JobDetails.css';
// import Header from '../../GdforEmployers/Header';

// Correct import assuming Header is a named export
import { Header } from '../../GdforEmployers/Header';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await jobsApi.getJobById(id);
        setJob(jobData);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to fetch job with id ${id}:`, err);
        setError(err);
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="job-details-loading">Loading job details...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="page-container">
        <Header />
        <div className="job-details-error">
          <p>Error loading job details: {error.message}</p>
           <Link to="/jobsList" className="back-button">
          <i className="fa fa-arrow-left"></i> Back to Jobs
        </Link>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="page-container">
        <Header />
        <div className="job-not-found">
          <p>Job not found</p>
           <Link to="/jobsList" className="back-button">
          <i className="fa fa-arrow-left"></i> Back to Jobs
        </Link>
        </div>
      </div>
    );
  }
  
  // Determine first letter for company logo placeholder
  const companyInitial = job.title.charAt(0).toUpperCase();
  
  return (
    <div className="page-container">
      <Header />
      <div className="job-details-container">
        <div className="job-details-header">
          {/* <Link to="/" className="back-button">
            <i className="fa fa-arrow-left"></i> Back to Jobs
          </Link> */}

          <Link to="/jobsList" className="back-button">
          <i className="fa fa-arrow-left"></i> Back to Jobs
        </Link>

          <div className="job-details-title-section">
            <div className="company-logo" style={{ backgroundColor: getRandomColor() }}>
              {companyInitial}
            </div>
            <div className="job-title-details">
              <h1>{job.title}</h1>
              <p className="company-name">{job.companyId}</p>
              <div className="job-meta">
                <span className="job-location">
                  <i className="fa fa-map-marker"></i> {job.location}
                </span>
                <span className="job-type">
                  <i className="fa fa-briefcase"></i> {job.employmentType}
                </span>
                <span className="job-posted">
                  <i className="fa fa-calendar"></i> Posted {formatDate(job.postedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="job-salary-badge">
            <div className="salary-range">${job.salaryMin} - ${job.salaryMax}</div>
            <div className="salary-currency">{job.currency}</div>
          </div>
        </div>
        
        <div className="job-details-content">
          <section className="job-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>
          
          {job.requirements && (
            <section className="job-section">
              <h2>Requirements</h2>
              <p>{job.requirements}</p>
            </section>
          )}
          
          {job.benefits && (
            <section className="job-section">
              <h2>Benefits</h2>
              <p>{job.benefits}</p>
            </section>
          )}
          
          <section className="job-section">
            <h2>Additional Information</h2>
            <div className="job-info-grid">
              <div className="job-info-item">
                <span className="info-label">Employment Type:</span>
                <span className="info-value">{job.employmentType}</span>
              </div>
              <div className="job-info-item">
                <span className="info-label">Status:</span>
                <span className="info-value">{job.status}</span>
              </div>
              <div className="job-info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">{job.location}</span>
              </div>
              <div className="job-info-item">
                <span className="info-label">Salary Range:</span>
                <span className="info-value">${job.salaryMin} - ${job.salaryMax} {job.currency}</span>
              </div>
            </div>
          </section>
        </div>
        
        <div className="job-details-actions">
          <button className="apply-button">Apply Now</button>
          <button className="save-button">Save Job</button>
        </div>
      </div>
    </div>
  );
};

// Helper function for random background colors for company logos
const getRandomColor = () => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default JobDetailsPage;