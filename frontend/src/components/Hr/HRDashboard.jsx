

export const HRDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch jobs and exams created by this HR
    const fetchData = async () => {
      const jobsRes = await api.get('/jobs?hrId=current-user-id');
      const examsRes = await api.get('/exams?createdBy=current-user-id');
      setJobs(jobsRes.data);
      setExams(examsRes.data);
    };
    fetchData();
  }, []);

  const sendExam = async (jobId, examId) => {
    try {
      await api.post(`/exam-sessions/assign/${jobId}/${examId}`);
      alert('Exam sent to all candidates!');
    } catch (error) {
      console.error("Error sending exam:", error);
    }
  };

  return (
    <div>
      <h2>Your Job Posts</h2>
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>Applicants: {job.applicants.length}</p>
          
          <div className="exam-actions">
            <select>
              {exams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.examTitle}</option>
              ))}
            </select>
            <button onClick={() => sendExam(job.id, exam.id)}>
              Send Exam to Candidates
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HRDashboard;