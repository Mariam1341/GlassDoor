import styles from './companyOverview.module.css';
import { Navbar } from '../navbar';
import { Footer } from '../footer'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function CompanyDetails({ location }) {

    console.log('here is my response', location);
    const companyID = location.state.id;
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const image = location.state.image;

// 


    const fetchCompany = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/v1/company/' + companyID);
            console.log('companyData:', response.data);
            console.log('API companyData2:', response.data.data);
            
            const companyData = response.data.data ? response.data.data : [];
            console.log('companyData:', companyData);

            setCompany(companyData);
            console.log('company:', company);

            setLoading(false);
        } catch (err) {
            console.error('Error fetching companies:', err.message);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, [])

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.companyProfile}>
                    <div>
                        <img src="https://media.glassdoor.com/banner/bh/9848/paypal-banner-1477525372879.jpg" alt="" />
                    </div>
                    <div className={styles.logo}>
                        <img src={company.logo} alt="logo" />
                        <h1 className={styles.companyName}>{company.name}</h1>
                    </div>
                    <div className={styles.featuresContainer}>
                        <div className={styles.flex}>
                            <div className={styles.features}>
                                <i className="fas fa-bullseye"></i>
                                <p>Overview</p>
                            </div>
                            {/* <div className={styles.features}>
                                <p>5.1k</p>
                                <p>Reviews</p>
                            </div> */}
                            <div className={styles.features}>
                                <p>2.4k</p>
                                <p>Jobs</p>
                            </div>
                            {/* <div className={styles.features}>
                                <p>11k</p>
                                <p>Salaries</p>
                            </div> */}
                            <div className={styles.features}>
                                <p>1.3k</p>
                                <p>Interviews</p>
                            </div>
                            {/* <div className={styles.features}>
                                <p>2.1k</p>
                                <p>Banefits</p>
                            </div>
                            <div className={styles.features}>
                                <p>98</p>
                                <p>Photos</p>
                            </div> */}
                        </div>
                        <div className={styles.flex}>
                            <button className={styles.featuresBtnFollow}>Follow</button>
                            <button className={styles.featuresBtnSalary}><i className="fas fa-plus"></i>Add a Salary</button>
                        </div>
                    </div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.companyoverview}>
                        <h3>{company.name} Overview</h3>
                        <div className={styles.flex}>
                            <div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>Website: </p>
                                    <Link><p>{company.website}</p></Link>
                                </div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>Size: </p>
                                    <p>{company.totalEmployee}+ Employees</p>
                                </div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>Type: </p>
                                    <p>{company.companyType}</p>
                                </div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>Revenue: </p>
                                    <p>{company.revenue}</p>
                                </div>
                            </div>
                            <div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>CEO: </p>
                                    <p>{company.ceo}</p>
                                </div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>Founded: </p>
                                    <p>{company.foundedYear}</p>
                                </div>
                                <div className={styles.flex}>
                                    <p className={styles.typeHeading}>status: </p>
                                    <p>{company.status}</p>
                                </div>
                            </div>
                        </div>

                        <p>At {company.name},{company.brief}</p>
                    </div>
                    <div className={styles.rightExtraInfo}>
                        <h2>Jobs You May Like</h2>
                        <div className={styles.flex}>
                            <div className={styles.logoDiv}>
                                <img src="https://media.glassdoor.com/sqls/9848/paypal-squarelogo-1562008952564.png" alt="" />
                            </div>
                            <div className={styles.rightCompanyInfo}>
                                <p>Software Engineer 3</p>
                                <p>{company.name}, Inc. - Bangalore</p>
                                <p>₹3L - ₹10L</p>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.logoDiv}>
                                <img src="https://media.glassdoor.com/sqls/9848/paypal-squarelogo-1562008952564.png" alt="" />
                            </div>
                            <div className={styles.rightCompanyInfo}>
                                <p>MTS1, Software Engineer</p>
                                <p>{company.name}, Inc. - Bangalore</p>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.logoDiv}>
                                <img src="https://media.glassdoor.com/sqls/770542/izettle-squareLogo-1612887865954.png" alt="" />
                            </div>
                            <div className={styles.rightCompanyInfo}>
                                <p>Software Engineer 2</p>
                                <p>Zettle, Stockholm (Sweden)</p>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.logoDiv}>
                                <img src="https://media.glassdoor.com/sqls/261495/xoom-squarelogo-1540150291889.png" alt="" />
                            </div>
                            <div className={styles.rightCompanyInfo}>
                                <p>Software Engineer 3-Java,Growth Markets</p>
                                <p>Xoom, San Francisco, CA</p>
                                <p>₹3L - ₹10L</p>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.logoDiv}>
                                <img src="https://media.glassdoor.com/sqls/424728/braintree-squarelogo-1488318492634.png" alt="" />
                            </div>
                            <div className={styles.rightCompanyInfo}>
                                <p>MTS 2, Software Engineer</p>
                                <p>Braintree, Chicago, IL</p>
                                <p>₹2L - ₹10L</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}