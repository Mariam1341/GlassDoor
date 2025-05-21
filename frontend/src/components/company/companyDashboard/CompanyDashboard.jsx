import React, { useEffect, useState } from "react";
import styles from "./CompanyDashboard.module.css";
import { CompanyUpdateForm } from "../CompanyUpdateForm/CompanyUpdateForm";

export const CompanyDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/v1/company", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCompanies(data.data || []);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Company Dashboard</h2>

      <div className={styles.content}>
        <div className={styles.list}>
          {companies.map((company) => (
            <div key={company.id} className={styles.card}>
              <img src={company.logo} alt="logo" className={styles.logo} />
              <div className={styles.details}>
                <h3>{company.name}</h3>
                <p><strong>CEO:</strong> {company.ceo}</p>
                <p><strong>Type:</strong> {company.companyType}</p>
                <p><strong>Status:</strong> {company.status}</p>
                <p><strong>Founded:</strong> {company.foundedYear}</p>
              </div>
              <button onClick={() => handleUpdateClick(company)} className={styles.updateBtn}>
                Update
              </button>
            </div>
          ))}
        </div>

        {selectedCompany && (
          <div className={styles.updateForm}>
            <CompanyUpdateForm company={selectedCompany} onSuccess={fetchCompanies} />
          </div>
        )}
      </div>
    </div>
  );
};
