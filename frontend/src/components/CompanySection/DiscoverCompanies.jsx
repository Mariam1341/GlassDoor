import styled from "styled-components";
import { BiBuildings } from 'react-icons/bi';
import { FaRegBuilding } from 'react-icons/fa';
import { CgBriefcase } from 'react-icons/cg';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { FaRegSmileBeam } from 'react-icons/fa';
import { AiOutlineRight } from 'react-icons/ai';
import { RiCustomerService2Line } from 'react-icons/ri';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FiPenTool } from 'react-icons/fi';
import { GrTools } from 'react-icons/gr';
import { Navbar } from "../navbar";
import { Footer } from '../footer';



import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';


import './DiscoverCompanies.css';
import axios from 'axios';

export function DiscoverCompanies() {
    const history = useHistory();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/v1/company');
            setCompanies(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const showDetail = (company) => {
        history.push({
            pathname: "/companyDetails",
            state: {
                name: company.name,
                image: company.logo
            }
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Featured companies for comparison section
    const featuredCompanies = companies.slice(0, 4);
    
    return (
        <>
            <Navbar />
            <nav className="company-nav">
                <Link to="/companies"><div>Discover Companies</div></Link>
                <Link to="/CompareCompany"> <div>Compare Companies</div></Link>
                <div>Suggested Follows</div>
                <Link to="/reviewForm"><div>Write a Review</div></Link>
            </nav>
            
            <div className="cont1">
                <div>
                    <h2>Your Company Preferences</h2>
                    <div>
                        <BiBuildings fontSize="25px" />
                        <p>Preferred Industries</p>
                        <h3>Add Preffered Industries</h3>
                        <p>Preferred Company Size</p>
                        <h3>Add Preferred Company Size</h3>
                        <p>Companies You Follow</p>
                        <div>
                            <FaRegBuilding fontSize="25px" /> <h3>Google</h3>
                        </div>
                        <div>
                            <h3>Edit Company Preferences</h3>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <CgBriefcase color="rgb(102,192,128)" fontSize="25px" />
                            </div>
                            <div>
                                <IoIosArrowBack color="rgb(184,187,191)" fontSize="25px" />
                                <IoIosArrowForward color="rgb(80,88,99)" fontSize="25px" />
                            </div>
                        </div>
                        <p>Get personalised recommendations</p>
                        <h3>Are you open to relocation?</h3>
                        <div>
                            <button>Yes</button>
                            <button>No</button>
                        </div>
                        <p>Viewable by Employers
                            <IoInformationCircleOutline />
                        </p>
                    </div>
                </div>
                
                <div>
                    <h2>Companies Recommended for You</h2>
                    <p>Recommendations are based on your profile, job preferences, and activity on Glassdoor.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '45% 45%', justifyContent: 'space-around' }}>
                        {companies.map(company => (
                            <div 
                                key={company.id} 
                                className="company-card"
                                onClick={() => showDetail(company)}
                            >
                                <img src={company.logo} alt={company.name} />
                                <div>
                                    <div>
                                        <h3>{company.name}</h3>
                                        <p style={{ color: "rgb(12,170,65)" }}>
                                            {company.rating.toFixed(1)}
                                            <FaStar color="rgb(12,170,65)" fontSize="12px" />
                                        </p>
                                    </div>
                                    <div>
                                        <button>Follow</button>
                                    </div>
                                </div>
                                <p>100 Jobs · 2300 Reviews · 2200 Salaries</p>
                                <div>
                                    <FaRegSmileBeam fontSize="20px" /> 
                                    <p>Highly Rated for culture and values</p>
                                </div>
                            </div>
                        ))}
                        
                        <div className="company-card">
                            <h3>Not finding the right company?</h3>
                            <p>Use Glassdoor's Company Explorer to filter Companies by sector, ratings and more.</p>
                            <button style={{ 
                                border: "2px solid rgb(24,97,191)", 
                                color: "rgb(24,97,191)", 
                                width: "170px", 
                                height: "35px" 
                            }}>
                                Search Companies
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Reviews Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Latest Reviews for Recommended Companies</h2>
                <div style={{ display: 'flex' }}>
                    {featuredCompanies.slice(0, 3).map(company => (
                        <div 
                            key={`review-${company.id}`}
                            style={{
                                margin: '10px',
                                border: '1px solid #d1d1d1',
                                borderRadius: '5px',
                                backgroundColor: 'white',
                                width: '370px',
                                height: '250px',
                                padding: '1% 1.5%',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDetail(company)}
                        >
                            <div style={{ 
                                borderBottom: '1px solid #d1d1d1', 
                                display: 'flex', 
                                height: '80px', 
                                alignItems: 'center' 
                            }}>
                                <div>
                                    <img 
                                        src={company.logo} 
                                        alt={company.name} 
                                        style={{
                                            width: '50px',
                                            border: '1px solid #d1d1d1',
                                            borderRadius: '3px',
                                            margin: '0 10px'
                                        }} 
                                    />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{company.name}</h3>
                                    <p style={{ 
                                        color: "rgb(12,170,65)", 
                                        margin: 0 
                                    }}>
                                        {company.rating.toFixed(1)}
                                        <FaStar color="rgb(12,170,65)" fontSize="12px" />
                                    </p>
                                </div>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-around' 
                            }}>
                                <p>Current Employee Software Engineer</p>
                                <div>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i} 
                                            color="rgb(12,170,65)" 
                                            fontSize="15px" 
                                        />
                                    ))}
                                </div>
                                <p>"Best company and best work culture ever"</p>
                                <p>July 3,2021</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compare Companies Section */}
            <div style={{ 
                backgroundColor: 'white', 
                padding: '1%'
            }}>
                <h2 style={{ marginLeft: '15%' }}>Compare Companies</h2>
                <p style={{ marginLeft: '15%' }}>See how companies stack up against their competitors using data only found on Glassdoor.</p>
                <div style={{ 
                    display: 'flex', 
                    width: '80%', 
                    margin: 'auto' 
                }}>
                    <div style={{ display: 'flex', margin: '10px' }}>
                        <div 
                            style={{
                                border: '1px solid #f5f5f5',
                                width: '200px',
                                height: '120px',
                                padding: '1%',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDetail(featuredCompanies[0])}
                        >
                            <img 
                                src={featuredCompanies[0]?.logo} 
                                alt={featuredCompanies[0]?.name}
                                style={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '3px',
                                    width: '50px'
                                }} 
                            />
                            <h3 style={{ margin: 0 }}>{featuredCompanies[0]?.name}</h3>
                            <p style={{ 
                                color: "rgb(12,170,65)", 
                                margin: 0 
                            }}>
                                {featuredCompanies[0]?.rating.toFixed(1)}
                                <FaStar color="rgb(12,170,65)" fontSize="12px" />
                            </p>
                        </div>
                        <div 
                            style={{
                                border: '1px solid #f5f5f5',
                                width: '200px',
                                height: '120px',
                                padding: '1%',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDetail(featuredCompanies[1])}
                        >
                            <img 
                                src={featuredCompanies[1]?.logo} 
                                alt={featuredCompanies[1]?.name}
                                style={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '3px',
                                    width: '50px'
                                }} 
                            />
                            <h3 style={{ margin: 0 }}>{featuredCompanies[1]?.name}</h3>
                            <p style={{ 
                                color: "rgb(12,170,65)", 
                                margin: 0 
                            }}>
                                {featuredCompanies[1]?.rating.toFixed(1)}
                                <FaStar color="rgb(12,170,65)" fontSize="12px" />
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', margin: '10px' }}>
                        <div 
                            style={{
                                border: '1px solid #f5f5f5',
                                width: '200px',
                                height: '120px',
                                padding: '1%',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDetail(featuredCompanies[2])}
                        >
                            <img 
                                src={featuredCompanies[2]?.logo} 
                                alt={featuredCompanies[2]?.name}
                                style={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '3px',
                                    width: '50px'
                                }} 
                            />
                            <h3 style={{ margin: 0 }}>{featuredCompanies[2]?.name}</h3>
                            <p style={{ 
                                color: "rgb(12,170,65)", 
                                margin: 0 
                            }}>
                                {featuredCompanies[2]?.rating.toFixed(1)}
                                <FaStar color="rgb(12,170,65)" fontSize="12px" />
                            </p>
                        </div>
                        <div 
                            style={{
                                border: '1px solid #f5f5f5',
                                width: '200px',
                                height: '120px',
                                padding: '1%',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => showDetail(featuredCompanies[3])}
                        >
                            <img 
                                src={featuredCompanies[3]?.logo} 
                                alt={featuredCompanies[3]?.name}
                                style={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '3px',
                                    width: '50px'
                                }} 
                            />
                            <h3 style={{ margin: 0 }}>{featuredCompanies[3]?.name}</h3>
                            <p style={{ 
                                color: "rgb(12,170,65)", 
                                margin: 0 
                            }}>
                                {featuredCompanies[3]?.rating.toFixed(1)}
                                <FaStar color="rgb(12,170,65)" fontSize="12px" />
                            </p>
                        </div>
                    </div>
                </div>
                <h3 style={{ 
                    color: "rgb(24,97,191)", 
                    marginLeft: "40%" 
                }}>
                    Compare Companies <AiOutlineRight /> 
                </h3>
                
                {/* Explore Sectors Section */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2 style={{ marginLeft: "15%" }}>Explore Sectors</h2>
                    <div style={{ display: "flex", width: "80%", margin: "auto" }}>
                        <div style={{ 
                            border: "1px solid #c7c7c7", 
                            fontWeight: "500", 
                            width: "400px", 
                            height: "80px", 
                            margin: "5px", 
                            padding: "1%",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <div style={{ 
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "30px",
                                height: "30px",
                                marginRight: "10px"
                            }}>
                                <RiCustomerService2Line fontSize="20px" />
                            </div>
                            <p>Customer Services</p>
                        </div>
                        {/* Add other sector cards similarly */}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
