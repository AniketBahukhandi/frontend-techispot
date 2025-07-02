import React from "react";
import styles from "./Community.module.css";

export default function Communities({ communities }) {
  return (
    <div className={styles.card}>
      {communities.map((group, index) => (
        <div className={styles.info} key={index}>
          <img src={group.pro} className={styles.img} alt="Community_Pic" />
          <div className={styles.data}>
            <h4>{group.name}</h4>
            <p>{group.members}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
