import React from "react";
import styles from "./style.module.css";

export const ProfileCard = ({ info }) => {
  return (
    <>
      <div className={styles.main}>
        {/* <h1>hello</h1> */}
        <div className={styles.image}>
          <img src={info.imageURL} alt="" />
        </div>
        <div className="title">
          <h1>{info.user_name}</h1>
        </div>
        <div className={styles.email}>
          <p>{info.email}</p>
        </div>
        <div className={styles.greet}>
          <p>I hope you find it easy!</p>
        </div>
      </div>
    </>
  );
};
