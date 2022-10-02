import React, { useEffect, useState } from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';
import AllEventsComponent from './AllEventsComponent';
import styles from './main_component.module.css';
<<<<<<< HEAD
import { AddCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';

=======
import AllEvents from './AllEvents/AllEvents';
>>>>>>> fa8669ab4a5cd67cc3bcc3c9e599179da8efddae

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
            <div className='hero'>
                <img id='hero-img' src={image} alt="hero-halloween" width="100%" />
            </div>
            <div className={styles.center_body}>
                <h1 className={styles.h1_title}>Trending This Week</h1>
                <TrendingList posts={posts} />
                <div className={styles.create_btn}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        sx={{ backgroundColor: "#006fbb", m: 2, mt: 4, p: 2, pr: 3, pl: 3, borderRadius: 20 }}
                    >
                        <AddCircleOutline sx={{ mr: 1 }} />
                        Create Your Own
                    </Button>
                </div>
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