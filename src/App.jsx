import React from "react";
// import Login from './pages/login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { useState } from "react";
import { Signup } from "./pages/signup";
import { Otp } from "./pages/otp";
import { Dashboard } from "./pages/dashboard";
import { CrimeReportForm } from "./pages/infopage";
import { Private } from "./routes/Private";
// import { PrivateOtp } from "./routes/PrivateOtp";
import { ProtectedOtp } from "./routes/ProtectedOtp";
import { ProfileCard } from "./components/profilecard/ProfileCard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/info" element={<CrimeReportForm/>} />

          {/* <Route element={<Private />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
          <Route element={<ProtectedOtp />}>
            <Route path="/otpverification" element={<Otp />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
