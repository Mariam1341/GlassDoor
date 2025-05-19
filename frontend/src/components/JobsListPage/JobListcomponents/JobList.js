// import React from 'react';
// import JobCard from './JobCard';
// import '../styles/JobList.css';

// const JobList = ({ jobs, loading, error, isFiltered }) => {
//   if (loading) {
//     return <div className="jobs-loading">Loading jobs...</div>;
//   }

//   if (error) {
//     return <div className="jobs-error">Error loading jobs: {error.message}</div>;
//   }

//   if (!jobs || jobs.length === 0) {
//     return (
//       <div className="no-jobs">
//         <p>No jobs found matching your criteria.</p>
//         {isFiltered && <p>Try adjusting your filters or search terms.</p>}
//       </div>
//     );
//   }

//   return (
//     <div className="job-list-container">
//       <div className="job-list-header">
//         <span>Showing {jobs.length} results {isFiltered && "(filtered)"}</span>
//         <div className="sort-by">
//           <span>Sort by:</span>
//           <select defaultValue="newest">
//             <option value="newest">Newest Post</option>
//             <option value="salary">Salary</option>
//             <option value="relevance">Relevance</option>
//           </select>
//         </div>
//       </div>
//       <div className="job-list">
//         {jobs.map(job => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobList;


// import React from 'react';
// import JobCard from './JobCard';
// import '../styles/JobList.css';

// const JobList = ({ jobs, loading, error, isFiltered }) => {
//   if (loading) {
//     return <div className="jobs-loading">Loading jobs...</div>;
//   }

//   if (error) {
//     return <div className="jobs-error">Error loading jobs: {error.message}</div>;
//   }

//   if (!jobs || jobs.length === 0) {
//     return (
//       <div className="no-jobs">
//         <p>No jobs found matching your criteria.</p>
//         {isFiltered && <p>Try adjusting your filters or search terms.</p>}
//       </div>
//     );
//   }

//   return (
//     <div className="job-list-container">
//       <div className="job-list-header">
//         <span>Showing {jobs.length} results {isFiltered && "(filtered)"}</span>
//         <div className="sort-by">
//           <span>Sort by:</span>
//           <select defaultValue="newest">
//             <option value="newest">Newest Post</option>
//             <option value="salary">Salary</option>
//             <option value="relevance">Relevance</option>
//           </select>
//         </div>
//       </div>
//       <div className="job-list">
//         {jobs.map(job => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobList;


import React from 'react';
import JobCard from './JobCard';
import '../styles/JobList.css';

const JobList = ({ jobs, loading, error, isFiltered }) => {
  if (loading) {
    return <div className="jobs-loading">Loading jobs...</div>;
  }

  if (error) {
    return <div className="jobs-error">Error loading jobs: {error.message}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-jobs">
        <p>No jobs found matching your criteria.</p>
        {isFiltered && <p>Try adjusting your filters or search terms.</p>}
      </div>
    );
  }

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <span>Showing {jobs.length} results {isFiltered && "(filtered)"}</span>
        <div className="sort-by">
          <span>Sort by:</span>
          <select defaultValue="newest">
            <option value="newest">Newest Post</option>
            <option value="salary">Salary</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>
      <div className="job-list">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;