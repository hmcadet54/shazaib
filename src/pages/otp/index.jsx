import React from "react";
import styles from "./styles.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

export const Otp = () => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = location.state || {};
  const [Authenticated, setAuthenticated] = useState(false);

  const Navigate = useNavigate();

  const otpHandler = (event) => {
    event.preventDefault();
    // console.log("Form Submitted", email);
    // console.log("Form Submitted", otp);

    const formresponse = {
      otp: otp,
      email: email,
    };

    const apiurl = "https://authapi-production-4e0d.up.railway.app/verifyOTP";

    try {
      setLoading(true);
      fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formresponse),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          setLoading(false);
          setAuthenticated(true);
          console.log("Otp Verified");
          Navigate("/dashboard", { state: { email, Authenticated: true } });
        } else {
          setLoading(false);
          console.log("Otp Verification Failed");
        }
      });
    } catch (error) {
      setLoading(false);
      console.log("Otp Verification Failed");
    }
  };

  return (
    <>
      <div className={styles.containerlogin}>
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>OTP Verification</h2>
            <p>
              Enter OTP sent to your email <br />
              {email}
            </p>
            <form onSubmit={otpHandler}>
              <div className={styles.inputfield}>
                <p>Enter your OTP</p>
                <input
                  type="text"
                  placeholder="XXXXXX"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div
                className={loading ? styles.LoadingButton : styles.submitbtn}
              >
                <button>Verify{loading ? <Loader /> : ""}</button>
              </div>
            </form>

            {/* <div className={styles.haveanAcount}>
              <p>
                Don't have an account? <RouterLink to="/signup">Signup</RouterLink>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
