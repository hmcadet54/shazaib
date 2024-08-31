import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import { Form, Link as RouterLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { Dashboard } from "../dashboard";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const sendloginreq = async (formresponse) => {
    const apiurl = "https://authapi-production-4e0d.up.railway.app/signin";
    try {
      setLoading(true);
      const response = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formresponse),
      });
  
      if (response.ok) {
        setLoading(false);
        setAuthenticated(true);
        const data = await response.json();
        console.log(data);
        // Assuming navigate is a function to redirect user after successful login
        localStorage.setItem("id", data.user_info._id);
        navigate("/dashboard", { state: { email, Authenticated: true } });
      } else {
        setLoading(false);
        console.log("Login Failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Failed", error);
    }
  };
  
  const loginHandler = (event) => {
    event.preventDefault();


    const formresponse={
      email: email,
      password: password,
    }
    sendloginreq(formresponse);
    console.log('Form Submitted', formresponse);  
    
  };
  return (
    <>
      <div className={styles.containerlogin}>
  
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>Login to your account</h2>
            <p>Enter email below to login to your account</p>
            <div className={styles.difauth}>
              <button>
                Continue with Google
              </button>
            </div>
            <form onSubmit={loginHandler}>
              <div className={styles.inputfield}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
                {/* <p className={styles.ErrorMessage}>{FormError.email}</p> */}
              </div>
              <div className={styles.inputfield}>
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
                {/* <p className={styles.ErrorMessage}>{FormError.password}</p> */}
              </div>
      
              <div className={loading ? styles.LoadingButton : styles.submitbtn}>
                <button>Login{loading ? <Loader/>: ''}</button>
              </div>
            </form>

            <div className={styles.haveanAcount}>
              <p>
                Don't have an account? <RouterLink to="/signup">Signup</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
