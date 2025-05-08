import React, { useEffect, useState } from "react";
import Steps from './Steps';
import styles from './After_sign_in_2.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";
const StepsMix = () => {
    const [userData, setUserData] = useState(null);
    // let userData = {};
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            setUserData(response.data.data); 
            console.log("User Data:", userData);
            
        } catch (err) {
            setError("Failed to fetch profile. Please log in again.");
            console.error(err);
        }
        };

        fetchProfile();
    }, []);

return(
    <>
    <div className={styles.profile_div1}>
        <h3>About You</h3>
        <div className={styles.profile_div2}>
           <div className={styles.profileImage}>
           <Link to="/Profile">  <img src="https://www.glassdoor.com/app/static/img/icons/generic-avatar-50x50@2x.png?v=927f82gd" alt="profile"/>
           </Link></div>
            <div className={styles.profile_div2_2}>
                <div>
                {userData ? userData.userName : "Loading..."}
                </div>
                <Link to="/Profile"><div className={styles.profile_div2_2_2}>
                    <span>Finish Your Profile</span>
                </div></Link>
            </div>
        </div>
        <div className={styles.profile_div1_h3_2}>
            <h3>Complete These Steps</h3>
        </div>
        <div className={styles.profile_div4}>
            <span>Setup job alert</span>
            <span>
                <i>
                    <span></span>
                </i>
            </span>
        </div>
        <div>
            <Steps t="Follow 3 companies" />
            <Steps t="Write a review"/>
            <Steps t="Add a Salary"/>
            <Steps t="Upload a CV"/>
        </div>
    </div>
    </>
);

};

export default StepsMix;