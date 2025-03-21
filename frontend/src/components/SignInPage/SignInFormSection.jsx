import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useHistory, Link } from "react-router-dom";
import { ModalPage } from '../Modal/Modal';

const SignInCont = styled.div`
  background: url(${"https://www.glassdoor.com/app/static/img/home/heroLaptop.jpg?v=674d79pgbp"});
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
    /* padding:0 3%; */
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
`

export function SignInFormSection() {
  const [loginData, setLoginData] = useState({});
  const history = useHistory();
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    messege: ""
  });

  const handleHideModal = () => {
    setTimeout(() => {
      setModalStatus({ ...modalStatus, isOpen: false, messege: "" });
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setLoginData({ ...loginData, [name]: value })
  }

  const postData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/auth/register", loginData)
      .then(({ data }) => {
        setModalStatus({ ...modalStatus, isOpen: true, messege: "Successfully Registered!" });
        handleHideModal();
        setIsRegistered("block");
        setIsInvalid("none");
        setLoginData({ email: "", password: "" });
        console.log(data);
      })
      .catch((err) => {
        console.log("err:", err);
        setIsInvalid("block");
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", loginData)
      .then(({ data }) => {
        console.log("Login Successful:", data);
        localStorage.setItem("token", data.token); // تخزين التوكن في localStorage لاستخدامه لاحقًا
        history.push("/Dashboard");
      })
      .catch((err) => {
        console.log("Login Error:", err);
        setIsInvalid("block");
      });
  };
  
  const [isRegistered, setIsRegistered] = useState("none")
  const [isInValid, setIsInvalid] = useState("none")
  const [isSigningIn, setIsSigningIn] = useState(true)

  return (
    <>
      <ModalPage isOpen={modalStatus.isOpen} messege={modalStatus.messege} />
      <SignInCont
        img={
          "https://www.glassdoor.com/app/static/img/home/heroLaptop.jpg?v=674d79pgbp"
        }
      >
        <div>
          <div>
            <h1 style={{ color: "white" }}>Find The Job That Fits Your Life</h1>
            <p style={{ color: "white" }}>
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>
            <div>
              <Link to="/">
                {" "}
                <button
                  style={{ backgroundColor: "rgb(24,119,242)", color: "white" }}
                >
                  <div>
                    <FaFacebook fontSize="25px" color="white" />
                  </div>
                  <h3>Continue With Facebook</h3>
                </button>
              </Link>
              <Link to="/">
                {" "}
                <button
                  style={{
                    color: "rgb(220,78,65)",
                    backgroundColor: "white",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <FcGoogle fontSize="25px" />
                  </div>
                  <h3>Continue With Google</h3>
                </button>
              </Link>
            </div>

            <hr />
            <form action="">
              <h3 style={{ color: "greenyellow", display: isRegistered }}>
                Successfully Registered
              </h3>
              <h3 style={{ color: "yellow", display: isInValid }}>
                Invalid Credentials!
              </h3>
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
  )
}
