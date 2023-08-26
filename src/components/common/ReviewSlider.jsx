import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

import { useEffect } from "react";
import { useState } from "react";
import { apiConnector } from "../../services/apiConnector";

import { ratingsEndpoints } from "../../services/apis";
import ReviewCard from "../core/Catalog/ReviewCard";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewLoader = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        const { data } = response;

        if (data?.success) {
          setReviews(data?.data);
        }
        
      } catch (error) {}
    };
    reviewLoader();
  }, []);


  console.log("printing review", reviews);

  return (
    <div className="  ">
      {reviews?.length ? (
        <div className="">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            // loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            breakpoints={{
              1900: { slidesPerView: 3 },
              900: { slidesPerView: 2 },
              1400: { slidesPerView: 3 },
            }}
            className=" flex items-center justify-center  w-9/12 mx-auto"
          >
            {reviews?.map((review, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="mySwiper flex items-center justify-center"
                >
                  <ReviewCard review={review} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <p className="text-center">No Reviews Found</p>
      )}
    </div>
  );
};

export default ReviewSlider;
