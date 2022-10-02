import React, { useState } from "react";
import styles from "./landing_page.module.css";
import puzzle from "../../assets/icons_amenities/puzzle-piece.png";
import barbecue from "../../assets/icons_amenities/barbecue.png";
import billiard from "../../assets/icons_amenities/billiard-ball.png";
import dumbbell from "../../assets/icons_amenities/dumbbell.png";
import ping_pong from "../../assets/icons_amenities/ping-pong.png";

const FeaturedCard = ({ post }) => {
  var icon;
  if (post.location == "Gym") {
    icon = dumbbell;
  } else if (post.location == "BBQ") {
    icon = barbecue;
  } else if (post.location == "Puzzle Room") {
    icon = puzzle;
  } else if (post.location == "Billiard Room") {
    icon = billiard;
  } else if (post.location == "Ping Pong Table") {
    icon = ping_pong;
  }
  var time = post.startTime + " - " + post.endTime;
  return (
    <div className={styles.card_root}>
      <div className={styles.card_info}>
        <div className={styles.card_headerContainer}>
          <img className={styles.card_icon} src={icon} />
          <div className={styles.card_TextContainer}>
            <p className={styles.card_title}>{post.title}</p>
            <p className={styles.card_description}>{post.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.card_date}>
        <p>{time}</p>
      </div>
    </div>
  );
};
export default FeaturedCard;
