import React, { useEffect, useState } from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import TrendingList from './LandingPage/TrendingList';
import Button from '@mui/material/Button';
import NewActivityModal from './AddNewActivityModal/NewActivityModal';


const MainComponent = () => {
    const [isModalOpen, setIsOpenModal] = useState(false);
    function handleOpen() {
        setIsOpenModal(true);
    }
    return (
        <>
            <Header />
            <div className='hero'>
                <img src={image} alt="hero-halloween" width="100%" />
            </div>
            <TrendingList />
            <Button onClick={handleOpen}>Open modal</Button>
            {isModalOpen && <NewActivityModal />}
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