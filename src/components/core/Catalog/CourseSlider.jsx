import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import CourseCard from "./CourseCard";

const CourseSlider = ({ courses }) => {
  return (
    <div className="  ">
      {courses?.length ? (
        <div className="">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            // loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            breakpoints={{
              1900: { slidesPerView: 4 },
              900: { slidesPerView: 2 },
              1400: { slidesPerView: 3 },
            }}
            className=" flex items-center justify-center"
          >
            {courses?.map((course, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="mySwiper flex items-center justify-center"
                >
                  <CourseCard course={course} Height={"h-[400px]"} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <p>No courses Found</p>
      )}
    </div>
  );
};

export default CourseSlider;
