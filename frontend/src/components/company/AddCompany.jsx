import React, { useState, useRef } from "react";
import styles from "./AddCompany.module.css";

export const AddCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    website: "",
    totalEmployee: "",
    salaryRange: "",
    revenue: "",
    foundedYear: "",
    status: "",
    companyType: "",
    ceo: "",
    logo: "",
 
  });

  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCompany((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:9090/api/v1/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(company),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to add company.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add a New Company</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input type="text" name="name" value={company.name} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Website</label>
          <input type="text" name="website" value={company.website} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Total Employees</label>
          <input type="text" name="totalEmployee" value={company.totalEmployee} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Salary Range</label>
          <input type="text" name="salaryRange" value={company.salaryRange} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Annual Revenue</label>
          <input type="text" name="revenue" value={company.revenue} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Founded Year</label>
          <input type="text" name="foundedYear" value={company.foundedYear} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Company Status</label>
          <input type="text" name="status" value={company.status} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Sector / Type</label>
          <input type="text" name="companyType" value={company.companyType} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>CEO Name</label>
          <input type="text" name="ceo" value={company.ceo} onChange={handleChange} />
        </div>

        {/* <div className={styles.formGroup}>
          <label>Rating</label>
          <input type="number" step="0.1" min="1" max="5" name="rating" value={company.rating} onChange={handleChange} />
        </div> */}

        <div className={styles.formGroup}>
          <label>Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            ref={fileInputRef}
            className={styles.fileInput}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>Add Company</button>
      </form>
    </div>
  );

};
export default AddCompany;  
