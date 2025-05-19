import React, { useState, useEffect } from 'react';
import SalarySlider from './SalarySlider';
import '../styles/JobFilters.css';
import jobsApi from '../api/jobsApi';

const JobFilters = ({ onFilterChange, onApplyFilters, onResetFilters }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter options from API
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [statuses, setStatuses] = useState([]);
  
  // Selected filters (single selection)
  const [filters, setFilters] = useState({
    location: '',
    title: '',
    type: '',
    currency: '',
    status: ''
  });

  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const [
          locationsData, 
          titlesData, 
          typesData, 
          currenciesData, 
          statusesData
        ] = await Promise.all([
          jobsApi.getAllLocations(),
          jobsApi.getAllTitles(),
          jobsApi.getAllEmploymentTypes(),
          jobsApi.getAllCurrencies(),
          jobsApi.getAllStatuses()
        ]);
        
        setLocations(locationsData);
        setTitles(titlesData);
        setEmploymentTypes(typesData);
        setCurrencies(currenciesData);
        setStatuses(statusesData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = {
      ...filters,
      [filterName]: value
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      location: '',
      title: '',
      type: '',
      currency: '',
      status: ''
    };
    
    setFilters(resetFilters);
    onResetFilters();
  };

  if (loading) {
    return <div className="filters-loading">Loading filters...</div>;
  }

  if (error) {
    return <div className="filters-error">Error loading filters</div>;
  }

  return (
    <div className="filters-container">
      <section className="filter-section">
        <h3>Job Title</h3>
        <div className="select-group">
          <select 
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
          >
            <option value="">All Titles</option>
            {titles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="filter-section">
        <h3>Location</h3>
        <div className="select-group">
          <select 
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="filter-section">
        <h3>Employment Type</h3>
        <div className="select-group">
          <select 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            {employmentTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="filter-section">
        <h3>Status</h3>
        <div className="select-group">
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="filter-section">
        <h3>Currency</h3>
        <div className="select-group">
          <select 
            value={filters.currency}
            onChange={(e) => handleFilterChange('currency', e.target.value)}
          >
            <option value="">All Currencies</option>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="filter-actions">
        <button className="filter-button apply" onClick={handleApplyFilters}>Apply Filters</button>
        <button className="filter-button reset" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default JobFilters;

 
// import React, { useState, useEffect } from 'react';
// import '../styles/JobFilters.css';
// import jobsApi from '../api/jobsApi';

// const JobFilters = ({ onFilterChange, onApplyFilters, onResetFilters }) => {
//   const [titles, setTitles] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [filters, setFilters] = useState({ title: [], location: [] });
//   const [openDropdown, setOpenDropdown] = useState(null);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [titleData, locationData] = await Promise.all([
//           jobsApi.getAllTitles(),
//           jobsApi.getAllLocations()
//         ]);
//         setTitles(titleData);
//         setLocations(locationData);
//       } catch (err) {
//         console.error('Failed to fetch filters:', err);
//       }
//     };
//     fetchFilters();
//   }, []);

//   const toggleDropdown = (type) => {
//     setOpenDropdown(openDropdown === type ? null : type);
//   };

//   const handleMultiSelect = (type, value) => {
//     const updated = filters[type].includes(value)
//       ? filters[type].filter((v) => v !== value)
//       : [...filters[type], value];

//     const newFilters = { ...filters, [type]: updated };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const clearFilter = (type) => {
//     const newFilters = { ...filters, [type]: [] };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const isChecked = (type, value) => filters[type].includes(value);

//   return (
//     <div className="filters-container">
//       {/* Location Filter */}
//       <div className="filter-item">
//         <div className="filter-pill" onClick={() => toggleDropdown('location')}>
//           Location ▾
//         </div>
//         {openDropdown === 'location' && (
//           <div className="dropdown-box">
//             <div className="dropdown-header">
//               <span>Location</span>
//               <button onClick={() => clearFilter('location')}>Clear</button>
//             </div>
//             <div className="checkbox-list">
//               {locations.map((loc, idx) => (
//                 <label key={idx}>
//                   <input
//                     type="checkbox"
//                     checked={isChecked('location', loc)}
//                     onChange={() => handleMultiSelect('location', loc)}
//                   />
//                   {loc}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Title Filter */}
//       <div className="filter-item">
//         <div className="filter-pill" onClick={() => toggleDropdown('title')}>
//           Title ▾
//         </div>
//         {openDropdown === 'title' && (
//           <div className="dropdown-box">
//             <div className="dropdown-header">
//               <span>Designation</span>
//               <button onClick={() => clearFilter('title')}>Clear</button>
//             </div>
//             <div className="checkbox-list">
//               {titles.map((title, idx) => (
//                 <label key={idx}>
//                   <input
//                     type="checkbox"
//                     checked={isChecked('title', title)}
//                     onChange={() => handleMultiSelect('title', title)}
//                   />
//                   {title}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobFilters;
