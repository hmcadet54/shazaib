import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import styles from "./style.module.css";
import { ProfileCard } from "../../components/profilecard/ProfileCard";

export const Dashboard = () => {

  const Navigate = useNavigate();
  // const location = useLocation();
  // const { email } = location.state || {};
  const [info, setInfo] = useState({});
  const getdata = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await fetch(`https://authapi-production-4e0d.up.railway.app/getuser/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    Navigate("/");
  }

  useEffect(() => {
    getdata();
  }
  , []);
  console.log(info);

  return (
    <>
      <ProfileCard info={info}/>
      <a href="" onClick={handleLogout}>logout?</a>
    </>
  );
};
