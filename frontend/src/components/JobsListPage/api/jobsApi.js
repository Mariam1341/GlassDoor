import axios from 'axios';




const API_BASE_URL = 'http://localhost:9090/api/v1';



// Create an axios instance with some defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Add request/response interceptors for debugging
apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

const jobsApi = {
  getAllJobs: async () => {
    try {
      const response = await apiClient.get('/jobs/allJobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },
  
  getJobById: async (id) => {
    try {
      const response = await apiClient.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job with id ${id}:`, error);
      throw error;
    }
  },
  
  getJobsByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/jobs/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching jobs with status ${status}:`, error);
      throw error;
    }
  },
  
  // New API endpoints
  getAllLocations: async () => {
    try {
      const response = await apiClient.get('/jobs/allLocations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },
  
  getAllTitles: async () => {
    try {
      const response = await apiClient.get('/jobs/allTitles');
      return response.data;
    } catch (error) {
      console.error('Error fetching titles:', error);
      throw error;
    }
  },
  
  getAllEmploymentTypes: async () => {
    try {
      const response = await apiClient.get('/jobs/allEmplymentTypes');  // Note: the endpoint has a typo in "Employment"
      return response.data;
    } catch (error) {
      console.error('Error fetching employment types:', error);
      throw error;
    }
  },
  
  getAllCurrencies: async () => {
    try {
      const response = await apiClient.get('/jobs/allCurrencies');
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  },
  
  getAllStatuses: async () => {
    try {
      const response = await apiClient.get('/jobs/allStatus');
      return response.data;
    } catch (error) {
      console.error('Error fetching statuses:', error);
      throw error;
    }
  },
  
  filterJobs: async (filters) => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filters.location) params.append('location', filters.location);
      if (filters.currency) params.append('currency', filters.currency);
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.title) params.append('title', filters.title);
      
      const response = await apiClient.get(`/jobs/filter?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering jobs:', error);
      throw error;
    }
  }
};

export default jobsApi;