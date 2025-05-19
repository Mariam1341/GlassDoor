// import React, { useState, useEffect } from 'react';
// import Header from '../JobListcomponents/Header';
// import SearchBar from '../JobListcomponents/SearchBar';
// import JobFilters from '../JobListcomponents/JobFilters';
// import JobList from '../JobListcomponents/JobList';
// import jobsApi from '../api/jobsApi';
 
// const HomePage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchParams, setSearchParams] = useState({ jobTitle: '', location: '' });
//   const [filters, setFilters] = useState({
//     location: '',
//     title: '',
//     type: '',
//     currency: '',
//     status: ''
//   });
//   const [isFiltersApplied, setIsFiltersApplied] = useState(false);

//   // Initial fetch of all jobs
//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         setLoading(true);
//         const jobsData = await jobsApi.getAllJobs();
//         setJobs(jobsData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch jobs:", err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchAllJobs();
//   }, []);

//   // Handler for filter changes
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   // Handler for applying filters
//   const handleApplyFilters = async (appliedFilters) => {
//     try {
//       setLoading(true);
//       setIsFiltersApplied(true);
      
//       // Check if we have any active filters
//       const hasActiveFilters = Object.values(appliedFilters).some(value => value !== '');
      
//       if (hasActiveFilters) {
//         // Use the filter API endpoint
//         const filteredJobs = await jobsApi.filterJobs(appliedFilters);
//         setJobs(filteredJobs);
//       } else {
//         // If no filters, get all jobs
//         const allJobs = await jobsApi.getAllJobs();
//         setJobs(allJobs);
//       }
      
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to apply filters:", err);
//       setError(err);
//       setLoading(false);
//     }
//   };

//   // Handler for resetting filters
//   const handleResetFilters = async () => {
//     try {
//       setLoading(true);
//       setIsFiltersApplied(false);
      
//       // Reset the filters state
//       setFilters({
//         location: '',
//         title: '',
//         type: '',
//         currency: '',
//         status: ''
//       });
      
//       // Fetch all jobs again
//       const allJobs = await jobsApi.getAllJobs();
//       setJobs(allJobs);
      
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to reset filters:", err);
//       setError(err);
//       setLoading(false);
//     }
//   };

//   // Handler for search
//   const handleSearch = async (params) => {
//     setSearchParams(params);
    
//     try {
//       setLoading(true);
      
//       // If we have a job title search, use the title endpoint
//       if (params.jobTitle) {
//         const jobsByTitle = await jobsApi.filterJobs({ title: params.jobTitle });
//         setJobs(jobsByTitle);
//       } 
//       // If we have a location search, use the location endpoint
//       else if (params.location) {
//         const jobsByLocation = await jobsApi.filterJobs({ location: params.location });
//         setJobs(jobsByLocation);
//       }
//       // If both fields are empty, get all jobs
//       else {
//         const allJobs = await jobsApi.getAllJobs();
//         setJobs(allJobs);
//       }
      
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to search jobs:", err);
//       setError(err);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="home-page">
//       <Header />
//       <main className="main-content">
//         <div className="hero-section">
//           <SearchBar onSearch={handleSearch} />
//         </div>
//         <div className="content-container">
//           <aside className="filters-sidebar">
//             <JobFilters 
//               onFilterChange={handleFilterChange} 
//               onApplyFilters={handleApplyFilters}
//               onResetFilters={handleResetFilters}
//             />
//           </aside>
//           <section className="jobs-content">
//             <JobList 
//               jobs={jobs} 
//               loading={loading} 
//               error={error} 
//               isFiltered={isFiltersApplied}
//             />
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import Header from '../JobListcomponents/Header';
import SearchBar from '../JobListcomponents/SearchBar';
import JobFilters from '../JobListcomponents/JobFilters';
import JobList from '../JobListcomponents/JobList';
import jobsApi from '../api/jobsApi';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({ jobTitle: '', location: '' });
  const [filters, setFilters] = useState({
    location: '',
    title: '',
    type: '',
    currency: '',
    status: ''
  });
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  // Initial fetch of all jobs
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await jobsApi.getAllJobs();
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, []);

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handler for applying filters
  const handleApplyFilters = async (appliedFilters) => {
    try {
      setLoading(true);
      setIsFiltersApplied(true);
      
      // Check if we have any active filters
      const hasActiveFilters = Object.values(appliedFilters).some(value => value !== '');
      
      if (hasActiveFilters) {
        // Use the filter API endpoint
        const filteredJobs = await jobsApi.filterJobs(appliedFilters);
        setJobs(filteredJobs);
      } else {
        // If no filters, get all jobs
        const allJobs = await jobsApi.getAllJobs();
        setJobs(allJobs);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Failed to apply filters:", err);
      setError(err);
      setLoading(false);
    }
  };

  // Handler for resetting filters
  const handleResetFilters = async () => {
    try {
      setLoading(true);
      setIsFiltersApplied(false);
      
      // Reset the filters state
      setFilters({
        location: '',
        title: '',
        type: '',
        currency: '',
        status: ''
      });
      
      // Fetch all jobs again
      const allJobs = await jobsApi.getAllJobs();
      setJobs(allJobs);
      
      setLoading(false);
    } catch (err) {
      console.error("Failed to reset filters:", err);
      setError(err);
      setLoading(false);
    }
  };

  // Handler for search
  const handleSearch = async (params) => {
    setSearchParams(params);
    
    try {
      setLoading(true);
      
      // If we have a job title search, use the title endpoint
      if (params.jobTitle) {
        const jobsByTitle = await jobsApi.filterJobs({ title: params.jobTitle });
        setJobs(jobsByTitle);
      } 
      // If we have a location search, use the location endpoint
      else if (params.location) {
        const jobsByLocation = await jobsApi.filterJobs({ location: params.location });
        setJobs(jobsByLocation);
      }
      // If both fields are empty, get all jobs
      else {
        const allJobs = await jobsApi.getAllJobs();
        setJobs(allJobs);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Failed to search jobs:", err);
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-1">
        <div className="bg-green-400 py-4 text-center">
           <div className="max-w-4xl mx-auto px-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row container mx-auto px-4 py-4">
          {/* Left sidebar with filters */}
          <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
            <JobFilters 
              onFilterChange={handleFilterChange} 
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
          
          {/* Right content with job listings */}
          <div className="w-full md:w-3/4">
            <JobList 
              jobs={jobs} 
              loading={loading} 
              error={error} 
              isFiltered={isFiltersApplied}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;