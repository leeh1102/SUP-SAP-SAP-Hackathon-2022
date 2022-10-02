import React, { useState } from "react";
import styles from "./landing_page.module.css";
import axios from "axios";
import puzzle from "../../assets/icons_amenities/puzzle-piece.png";

const FeaturedCard = () => {
  return (
    <div className={styles.card_root}>
      <div className={styles.card_info}>
        <div className={styles.card_headerContainer}>
          <img className={styles.card_icon} src={puzzle} />
          <div className={styles.card_TextContainer}>
            <p className={styles.card_title}>Dev team vs UI team match!</p>
            <p className={styles.card_description}>
              Let's see which team can solve a 500 piece puzzle the fastest.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.card_date}>
        <p>October 5th, 5:30PM - 6:30PM</p>
      </div>
    </div>
  );
};
export default FeaturedCard;
