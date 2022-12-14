import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import FeaturedCard from "./FeaturedCard";

// Styles
import styles from "./landing_page.module.css";
import "swiper/css";
import { Button } from '@mui/material';

const TrendingList = ({ posts }) => {
  console.log(posts);
  return (
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
          {posts.map((post) => (
            <SwiperSlide>
              <div className={styles.card_container}>
                <FeaturedCard post={post} />
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <div className={styles.card_container}>
              <FeaturedCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.card_container}>
              <FeaturedCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.card_container}>
              <FeaturedCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.card_container}>
              <FeaturedCard />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.card_container}>
              <FeaturedCard />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
  );
};
export default TrendingList;
