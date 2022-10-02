import React, { useEffect, useState } from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';
import styles from './main_component.module.css';
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
            <div className='hero'>
                <img id='hero-img' src={image} alt="hero-halloween" width="100%" />
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