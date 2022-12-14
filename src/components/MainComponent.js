import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';
import styles from './main_component.module.css';
import { AddCircleOutline } from '@mui/icons-material';
import AllEvents from './AllEvents/AllEvents';
import CreateEventModalComponent from './CreateEventModalComponent';

function MainComponent() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Header />
            <div className={styles.hero}>
                <img className={styles.hero_left} src={image} alt="hero-halloween" />
                <div className={styles.hero_right}>
                    <h1 className={styles.hero_title}>Pool Table is Available Today from 5:00PM - 6:00PM!</h1>
                    <Button
                        href="/home"
                        style={{ fontSize: 20, fontWeight: 600 }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, padding: 1.5, borderRadius: 10, width: 200 }}
                    >
                        RSVP
                    </Button>
                </div>
            </div>
            <div className={styles.center_body}>
                <h1 className={styles.h1_title}>Trending This Week</h1>
                <TrendingList posts={posts} />
                <CreateEventModalComponent />
            </div>
            <div className={styles.center_body}>
                <h1 className={styles.h1_title}>All Events</h1>
                <div className='filter-button-group'>
                    <FilterComponent />
                </div>
                <AllEvents posts={posts} />
            </div>
        </>
    );
}

export default MainComponent;