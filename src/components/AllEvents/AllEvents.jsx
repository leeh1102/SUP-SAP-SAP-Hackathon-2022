import React from "react";
import styles from './all_events.module.css';
import Event from "./Event";

const AllEvents = ({ posts }) => {
    return (
        <div className={styles.root}>
            {posts.map((post) => (
                <Event post={post} />
            ))}
        </div>
    );
};
export default AllEvents;