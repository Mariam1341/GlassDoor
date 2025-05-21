// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// import axios from "axios";
// import Header from "../JobListcomponents/Header"; // ✅ Import the Header component
// import "../styles/PostJobPage.css";

 
// // import Header from '../../GdforEmployers/Header';

// const PostJobPage = () => {
//   // const history = useHistory(); // ✅ v5 version of navigate
// const history=useHistory();
//   const initialFormState = {
//     companyId: "",
//     hrId: "",
//     title: "",
//     description: "",
//     location: "",
//     employmentType: "",
//     salaryMin: "",
//     salaryMax: "",
//     salaryCurrency: "USD",
//     requirements: [""],
//     status: "OPEN",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRequirementChange = (index, value) => {
//     const updated = [...formData.requirements];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, requirements: updated }));
//   };

//   const addRequirement = () => {
//     setFormData((prev) => ({
//       ...prev,
//       requirements: [...prev.requirements, ""],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         postedAt: new Date().toISOString(),
//       };
//       await axios.post("http://localhost:9090/api/v1/jobs/addJob", payload);
//       alert("✅ Job posted successfully!");
//       setFormData(initialFormState); // Clear form
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to post job.");
//     }
//   };

 
//     const goHome = () => {
//     history.push("/");
//   };

//   return (
//     <>
//       {/* <Header/> ✅ Render the Header component */}
//       <div className="post-job-container">
//         <h2>Post a New Job</h2>
//         <form onSubmit={handleSubmit} className="post-job-form">
//           <div className="form-group">
//             <label>Company ID</label>
//             <input name="companyId" value={formData.companyId} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>HR ID</label>
//             <input name="hrId" value={formData.hrId} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Title</label>
//             <input name="title" value={formData.title} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Location</label>
//             <input name="location" value={formData.location} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Employment Type</label>
//             <input name="employmentType" value={formData.employmentType} onChange={handleChange} required />
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Salary Min</label>
//               <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Salary Max</label>
//               <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Currency</label>
//               <input name="salaryCurrency" value={formData.salaryCurrency} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Requirements</label>
//             {formData.requirements.map((req, idx) => (
//               <input
//                 key={idx}
//                 value={req}
//                 onChange={(e) => handleRequirementChange(idx, e.target.value)}
//                 className="requirement-input"
//               />
//             ))}
//             <button type="button" onClick={addRequirement} className="add-btn">+ Add Requirement</button>
//           </div>
//           <div className="button-group">
//             <button type="submit" className="submit-btn">Post Job</button>
//             <button type="button" onClick={goHome} className="back-btn">Back to Home</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PostJobPage;


// import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// import Header from "../JobListcomponents/Header"; // ✅ Import the Header component
// import "../styles/PostJobPage.css";

// const PostJobPage = () => {
//   const history = useHistory();

//   const initialFormState = {
//     companyId: "",
//     hrId: "",
//     title: "",
//     description: "",
//     location: "",
//     employmentType: "",
//     salaryMin: "",
//     salaryMax: "",
//     salaryCurrency: "USD",
//     requirements: [""],
//     status: "OPEN",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRequirementChange = (index, value) => {
//     const updated = [...formData.requirements];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, requirements: updated }));
//   };

//   const addRequirement = () => {
//     setFormData((prev) => ({
//       ...prev,
//       requirements: [...prev.requirements, ""],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         postedAt: new Date().toISOString(),
//       };
//       await axios.post("http://localhost:9090/api/v1/jobs/addJob", payload);
//       alert("✅ Job posted successfully!");
//       setFormData(initialFormState); // Clear form
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to post job.");
//     }
//   };

//   const goHome = () => {
//     history.push("/");
//   };

//   const goBackToJobsList = () => {
//     history.push("/jobsList");
//   };

//   return (
//     <>
//       {/* <Header /> Uncomment if needed */}
//       <div className="post-job-container">
//         <button onClick={goBackToJobsList} className="back-arrow-btn">
//           ← Back to Jobs List
//         </button>

//         <h2>Post a New Job</h2>
//         <form onSubmit={handleSubmit} className="post-job-form">
//           <div className="form-group">
//             <label>Company ID</label>
//             <input name="companyId" value={formData.companyId} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>HR ID</label>
//             <input name="hrId" value={formData.hrId} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Title</label>
//             <input name="title" value={formData.title} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Location</label>
//             <input name="location" value={formData.location} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Employment Type</label>
//             <input name="employmentType" value={formData.employmentType} onChange={handleChange} required />
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Salary Min</label>
//               <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Salary Max</label>
//               <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Currency</label>
//               <input name="salaryCurrency" value={formData.salaryCurrency} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>Requirements</label>
//             {formData.requirements.map((req, idx) => (
//               <input
//                 key={idx}
//                 value={req}
//                 onChange={(e) => handleRequirementChange(idx, e.target.value)}
//                 className="requirement-input"
//               />
//             ))}
//             <button type="button" onClick={addRequirement} className="add-btn">
//               + Add Requirement
//             </button>
//           </div>
//           <div className="button-group">
//             <button type="submit" className="submit-btn">
//               Post Job
//             </button>
//             <button type="button" onClick={goHome} className="back-btn">
//               Back to Home
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PostJobPage;
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../JobListcomponents/Header"; // ✅ Import the Header component
import "../styles/PostJobPage.css";

const PostJobPage = () => {
  const history = useHistory();

  const initialFormState = {
    title: "",
    description: "",
    location: "",
    employmentType: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD",
    requirements: [""],
    status: "OPEN",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...formData.requirements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, requirements: updated }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        postedAt: new Date().toISOString(),
      };
      await axios.post("http://localhost:9090/api/v1/jobs/addJob", payload);
      alert("✅ Job posted successfully!");
      setFormData(initialFormState); // Clear form
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post job.");
    }
  };

  const goHome = () => {
    history.push("/");
  };

  const goBackToJobsList = () => {
    history.push("/jobsList");
  };

  return (
    <>
      {/* <Header /> Uncomment if needed */}
      <div className="post-job-container">
        <button onClick={goBackToJobsList} className="back-arrow-btn">
          ← Back to Jobs List
        </button>

        <h2>Post a New Job</h2>
        <form onSubmit={handleSubmit} className="post-job-form">
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employment Type</label>
            <input name="employmentType" value={formData.employmentType} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Salary Min</label>
              <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Salary Max</label>
              <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Currency</label>
              <input name="salaryCurrency" value={formData.salaryCurrency} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Requirements</label>
            {formData.requirements.map((req, idx) => (
              <input
                key={idx}
                value={req}
                onChange={(e) => handleRequirementChange(idx, e.target.value)}
                className="requirement-input"
              />
            ))}
            <button type="button" onClick={addRequirement} className="add-btn">
              + Add Requirement
            </button>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Post Job
            </button>
            <button type="button" onClick={goHome} className="back-btn">
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostJobPage;
