import React from 'react';
import Header from './HeaderComponent';
import FilterComponent from './FilterComponent';
import image from '../assets/background.png';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha } from '@material-ui/material';


const MainComponent = () => {
    return (
        <>
            <Header />
            <Box
                classname="hero"
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    pt: 8,
                    pb: 6,
                }}>
                <Container maxwidth="sm">
                    <Typography
                        component="h2"
                        variant="h2"
                        align="center"
                        color="white"
                        backgroundColor={alpha('#000', 0.6)}
                        gutterBottom
                    >
                        Welcome to SSUUUUP SAP!
                    </Typography>
                </Container>
            </Box>
            <div className='hero'>
                <img src={image} alt="hero-halloween" width="100%" />
            </div>
            <div className='trending'>
                <h2>Trending This Week</h2>
            </div>
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