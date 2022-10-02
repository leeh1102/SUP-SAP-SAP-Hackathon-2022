import React from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';

const MainComponent = () => {
    return (
        <>
            <Header />
            <div className='hero'>
                <img src={image} alt="hero-halloween" width="100%" />
            </div>
            <FilterComponent />
        </>
    );
}

export default MainComponent;