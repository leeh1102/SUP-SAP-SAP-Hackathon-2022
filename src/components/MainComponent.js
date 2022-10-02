import React, { useEffect, useState } from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';
import AllEventsComponent from './AllEventsComponent';

function MainComponent() {
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     fetch('/api/posts')
    //         .then(response => { return response.json() })
    //         .then(data => {
    //             setPosts(data);
    //             console.log(data);
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    return (
        <>
            <Header />
            {/* <div>{data.name}</div>
            <div>{data.age}</div> */}
            <div className='hero'>
                <img src={image} alt="hero-halloween" width="100%" />
            </div>
            <TrendingList />
            <div className='all-events'>
                <h2>All Events</h2>
                <div className='filter-button-group'>
                    <FilterComponent />
                </div>
                <div className="all-events-grid-view">
                    <AllEventsComponent />
                </div>
            </div>
        </>
    );
}

export default MainComponent;