import { Navbar } from "../navbar";
import { Footer } from "../footer";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { JobCard } from "./JobCard";
import SearchRight from "../Search_right";

const Cont = styled.div`
  background-color: white;
  width: 85%;
  border-radius: 5px;
  margin: 20px auto;
  & > div {
    display: flex;
    & > div:nth-of-type(1) {
      height: 600px;
      width: 35%;
      border: 1px solid #d4d4d4;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
    }
    & > div:nth-of-type(2) {
      height: 600px;
      overflow-y: auto;
      overflow-x: hidden;
      width: 65%;
    }
  }
`;

const InnerNav = styled.div`
  background-color: white;
  display: flex;
  height: 70px;
  align-items: center;
  select {
    height: 40px;
    border: 1px solid #cecece;
    width: 180px;
    font-size: 17px;
    color: gray;
    margin: 0 7px;
  }
`;

export function JobsList({ location }) {
  const query = location?.state?.query || "";
  console.log("Query value:", query, typeof query);

  const [list, setList] = useState([]);
  const [rightShow, setRightShow] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = query
          ? `http://localhost:8080/api/v1/job?q=${encodeURIComponent(query)}`
          : "http://localhost:8080/api/v1/job";
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(url, { headers });
        console.log("API response:", response.data);

        const jobs = Array.isArray(response.data.data)
          ? response.data.data.map((job) => ({
              ...job,
              company: job.companyName || "Unknown Company",
              jobProfile: job.title || "Unknown Title",
              jobId: job.id || job._id // Ensure jobId is passed
            }))
          : [];

        console.log("Mapped jobs:", jobs);
        setList(jobs);
        setRightShow(jobs.length > 0 ? jobs[0] : {});
      } catch (err) {
        console.error("API error:", err.message, err.response?.status, err.response?.data);
        setList([]);
        setRightShow({});
      }
    };
    fetchJobs();
  }, [query]);

  const handleClick = (id) => {
    const selectedJob = list.find((elem) => elem.id === id);
    if (selectedJob) {
      setRightShow(selectedJob);
    }
  };

  return (
    <>
      <Navbar />
      <Cont>
        <InnerNav>
          <select name="jobType" id="jobType">
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Temporary">Temporary</option>
            <option value="Entry-level">Entry-level</option>
          </select>
          <select name="postedTime" id="postedTime">
            <option value="">Posted Any Time</option>
            <option value="Last Day">Last Day</option>
            <option value="Last 3 Days">Last 3 Days</option>
            <option value="Last Week">Last Week</option>
            <option value="Last 2 Weeks">Last 2 Weeks</option>
            <option value="Last Month">Last Month</option>
          </select>
          <select name="salaryRange" id="salaryRange">
            <option value="₹10L-₹20L">₹10L-₹20L</option>
          </select>
          <select name="locationRange" id="locationRange">
            <option value="">Exact Location</option>
            <option value="Within 10 km">Within 10 km</option>
            <option value="Within 20 km">Within 20 km</option>
            <option value="Within 30 km">Within 30 km</option>
            <option value="Within 50 km">Within 50 km</option>
            <option value="Within 100 km">Within 100 km</option>
          </select>
        </InnerNav>
        <div>
          <div>
            {list.map((elem) => (
              <JobCard {...elem} key={elem.id} handleClick={handleClick} />
            ))}
          </div>
          <div>
            <SearchRight
              company={rightShow.company}
              jobProfile={rightShow.jobProfile}
              location={rightShow.location}
              salaryRange={rightShow.salaryRange}
              btnStatus={rightShow.btnStatus || "Easy Apply"}
              jobId={rightShow.jobId}
            />
          </div>
        </div>
      </Cont>
      <Footer />
    </>
  );
}