import React from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import FeaturedCard from "./FeaturedCard";

// Styles
import styles from './landing_page.module.css';
import "swiper/css";
import { Button } from '@mui/material';

const TrendingList = () => {
    return (
        <div className={styles.trending_root}>
        <h1 className={styles.trending_rootTitle}>Trending This Week</h1>
        <div className={styles.swiper_container}>
             <Swiper
            pagination
            navigation
            loop={true}
            spaceBetween={30}
            slidesPerView={3.5}
            centeredSlides={true}
            loopFillGroupWithBlank={true}
            >
                <SwiperSlide>
                    <div className={styles.card_container}>
                        <FeaturedCard/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.card_container}>
                        <FeaturedCard/>
                    </div>  
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.card_container}>
                        <FeaturedCard/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.card_container}>
                        <FeaturedCard/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.card_container}>
                        <FeaturedCard/>
                    </div>
                </SwiperSlide>
        </Swiper>
        </div>
        <div className={styles.addNewButtonContainer}>
           <Button className={styles.addNewButton} variant="contained">Add New</Button>
        </div>
</div>
    );
};
export default TrendingList;