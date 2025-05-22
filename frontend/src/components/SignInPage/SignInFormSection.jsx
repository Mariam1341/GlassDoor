import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { ModalPage } from "../Modal/Modal";
import { AuthContext } from "../../context/AuthContext";

const SignInCont = styled.div`
  background: url("https://www.glassdoor.com/app/static/img/home/heroLaptop.jpg?v=674d79pgbp");
  height: 590px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  & > div > div > p:nth-of-type(1) {
    font-size: 12px;
  }
  p {
    font-size: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  input {
    height: 30px;
    width: 75%;
    padding: 1.5%;
    border-radius: 5px;
    border: none;
    margin: 5px auto;
  }
  * {
    margin: 0;
  }
  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 10px auto;
    align-items: center;
    border: none;
    width: 80%;
    position: relative;
    height: 37px;
    border-radius: 5px;
    & > div {
      position: absolute;
      left: 10px;
    }
  }
  form > button {
    background-color: rgb(24, 119, 242);
    width: 180px;
    color: rgb(171, 204, 247);
    font-weight: bold;
    font-size: 15px;
  }
  & > div > div > button > div > div {
    position: absolute;
    left: 15px;
  }
  & > div > div {
    width: 500px;
    margin: auto;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & > div {
    z-index: 1;
    background-color: rgb(80, 88, 99, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function SignInFormSection() {
  const [loginData, setLoginData] = useState({ email: "", password: "", username: "" });
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    messege: "",
  });
  const [isRegistered, setIsRegistered] = useState("none");
  const [isInvalid, setIsInvalid] = useState("none");
  const [isSigningIn, setIsSigningIn] = useState(true);

  const handleHideModal = () => {
    setTimeout(() => {
      setModalStatus({ ...modalStatus, isOpen: false, messege: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/register", loginData);
      setModalStatus({ isOpen: true, messege: "Successfully Registered!" });
      handleHideModal();
      setIsRegistered("block");
      setIsInvalid("none");
      setLoginData({ email: "", password: "", username: "" });
      console.log("Registration data:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        login(data.token); // Update AuthContext
        history.push(data.role === "JOB_SEEKER" ? "/dashboard" : "/co-dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setIsInvalid("block");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/auth/authenticate", loginData);
      console.log("Login Successful:", data);
      localStorage.setItem("token", data.token);
      login(data.token); // Update AuthContext
      // Fetch user profile to get role
      const response = await axios.get("http://localhost:8080/api/v1/user/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const user = response.data;
      console.log("User Data:", user);
      history.push(user.role === "JOB_SEEKER" ? "/dashboard" : "/co-dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setIsInvalid("block");
    }
  };

  return (
    <>
      <ModalPage isOpen={modalStatus.isOpen} messege={modalStatus.messege} />
      <SignInCont>
        <div>
          <div>
            <h1 style={{ color: "white" }}>Find The Job That Fits Your Life</h1>
            <p style={{ color: "white" }}>
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>
            <form>
              {!isSigningIn && (
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                name="email"
                value={loginData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              {isSigningIn ? (
                <button onClick={handleLogin} style={{ color: "white" }}>
                  Continue with Email
                </button>
              ) : (
                <button onClick={postData} style={{ color: "white" }}>
                  Sign Up
                </button>
              )}
            </form>
            <p
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => setIsSigningIn(!isSigningIn)}
            >
              {isSigningIn ? "Click here to Sign Up" : "Click here to Sign In"}
            </p>
          </div>
        </div>
      </SignInCont>
    </>
  );
}