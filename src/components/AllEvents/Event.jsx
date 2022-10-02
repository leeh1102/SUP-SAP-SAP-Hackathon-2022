import { Button, IconButton } from "@mui/material";
import React from "react";
import styles from "./all_events.module.css";
import puzzle from "../../assets/icons_amenities/puzzle-piece.png";
import barbecue from "../../assets/icons_amenities/barbecue.png";
import billiard from "../../assets/icons_amenities/billiard-ball.png";
import dumbbell from "../../assets/icons_amenities/dumbbell.png";
import ping_pong from "../../assets/icons_amenities/ping-pong.png";
import person_icon from "../../assets/event_card_icons/User.svg";
import time_icon from "../../assets/event_card_icons/Clock.svg";
import location_icon from "../../assets/event_card_icons/Location.svg";
import like_icon from "../../assets/event_card_icons/Like.png";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

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
  var time = post.eventDate + ", " + post.startTime + " - " + post.endTime;
  return (
    <div className={styles.event_card}>
      <div className={styles.front}>
        <img src={icon} className={styles.activity_icon}/>
      </div>
      <div className={styles.middle}>
        <h4 className={styles.event_title}>{post.title}</h4>
        <p className={styles.event_description}>{post.description}</p>
        <div className={styles.info_container}>
          <img src={person_icon} className={styles.person_icon} />
          <p className={styles.participants}>{post.likes} participants</p>
        </div>
      </div>
      <div className={styles.end}>
        <div className={styles.info_container_first_row}>
          <img src={time_icon} />
          <p>{time}</p>
        </div>
        <div className={styles.info_container}>
          <img src={location_icon} />
          <p>{post.location}</p>
        </div>
        <div>
        <Button
          href="/home"
          fullWidth
                            variant="contained"
                            sx={{ mt: 0, mb: 0, padding: 1.5, borderRadius: 10 , height:30}}
                        >
                            RSVP
                        </Button>
        </div>
      </div>
      <div className={styles.share}>
        <IconButton
            aria-label="share"
            href={`mailto:?subject=Shall we join this event?&body=Check out this link: www.sup-sap.ca/post/23`}
            target="_blank"
            title="Share via Email">
          <IosShareOutlinedIcon />
        </IconButton>
        </div>
    </div>
  );
};

export default Event;
