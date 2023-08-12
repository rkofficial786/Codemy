import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./../../common/RatingStars";
import { useState } from "react";
import { useEffect } from "react";
import GetAvgRating from "./../../../utils/avgRating";
import Formateprice from "../../common/Formateprice";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  console.log("courees", course);
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <div
      className={`text-white ${Height} md:w-[350px] bg-richblack-700 rounded-lg p-6 hover:shadow-xl   hover:shadow-richblack-800 transition-all  ease-in-out duration-200 hover:scale-95`}
    >
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="mb-5">
            <img
              src={course?.thumbnail}
              alt=""
              className={`h-[200px] w-full rounded-xl object-cover`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold">{course.courseName}</p>
            <p className="text-richblack-300 font-extralight text-[13px]">
              by {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex gap-2 items-center">
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-300 text-[14px]">
                {"("}
                {course?.ratingAndReviews?.length}
                {")"}
              </span>
            </div>
            <p className="text-caribbeangreen-300 font-semibold flex gap-2 items-center">
              <Formateprice price={course?.price} />
              <span className="text-richblack-300 text-[13px]  font-normal">
                <del>
                  
                  <Formateprice price={course?.price*2.25} />
                </del>
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
