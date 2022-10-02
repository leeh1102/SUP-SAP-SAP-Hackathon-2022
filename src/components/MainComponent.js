import React from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';

const MainComponent = () => {
    return (
        <>
            <Header />
            <div className='hero'>
                <img src={image} alt="hero-halloween" width="100%" />
            </div>
            <TrendingList/>
            <div className='all-events'>
                <h2>All Events</h2>
                <div className='filter-button-group'>
                    <FilterComponent />
                </div>
            </div>
        </>
    );
}

export default MainComponent;