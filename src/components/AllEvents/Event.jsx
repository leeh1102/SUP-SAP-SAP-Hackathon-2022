import { Button } from "@mui/material";
import React from "react";
import styles from "./all_events.module.css";

const Event = ({ post }) => {
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
    <div className={styles.eventCard}>
      <div className={styles.front}>
        <img src={icon} />
      </div>
      <div className={styles.middle}>
        <h4 className={styles.event_title}>{post.title}</h4>
        <p className={styles.event_description}>{post.description}</p>
        <div className={styles.likes}>
          <img src={personIcon} />
        </div>
      </div>
      <div className={styles.end}>
        <div>
          <img src={time_icon} />
        </div>
        <div>
          <img src={location_icon} />
        </div>
        <div>
          <Button />
        </div>
      </div>
    </div>
  );
};
