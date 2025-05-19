import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/JobCard.css';
import { formatDate } from '../utils/formatUtils';


const JobCard = ({ job }) => {
  // Determine first letter for company logo placeholder
  const companyInitial = job.title.charAt(0).toUpperCase();

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-logo" style={{ backgroundColor: getRandomColor() }}>
          {companyInitial}
        </div>
        <div className="job-header-details">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.companyId}</p>
          <div className="job-location">
            <i className="fa fa-map-marker"></i>
            <span>{job.location}</span>
          </div>
        </div>
        <div className="job-salary">
          ${job.salaryMin} - ${job.salaryMax}
        </div>
      </div>
    
      <div className="job-description">
        <p>{job.description && job.description.length > 150 
          ? `${job.description.substring(0, 150)}...` 
          : job.description}</p>
      </div>
    
      <div className="job-footer">
        <div className="job-tags">
          {job.employmentType === "Full-time" && <span className="tag">Full Time</span>}
          {job.employmentType === "Part-time" && <span className="tag">Part Time</span>}
          {job.status === "Remote" && <span className="tag">Remote</span>}
          {job.title.toLowerCase().includes("senior") && <span className="tag">Senior</span>}
          {job.requirements && job.requirements.includes("Figma") && <span className="tag">Figma</span>}
          {job.title.toLowerCase().includes("ux") && <span className="tag">UX</span>}
        </div>
        <div className="job-date">{formatDate(job.postedAt)}</div>
      </div>
    
      <div className="job-actions">
        <Link to={`/job/${job.id}`} className="view-details-btn">View Details</Link>
      </div>
    </div>
  );
};

// Helper function for random background colors for company logos
const getRandomColor = () => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default JobCard;


