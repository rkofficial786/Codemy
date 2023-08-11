import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./../../common/RatingStars";
import { useState } from "react";
import { useEffect } from "react";
import GetAvgRating from './../../../utils/avgRating';

const CourseCard = ({ course, Height }) => {
    const [avgReviewCount,setAvgReviewCount]=useState(0)
console.log("courees",course);
    useEffect(()=>{
        const count=GetAvgRating(course?.ratingAndReviews)
        setAvgReviewCount(count)
    },[course])
  return (
    <div className="text-white bg-richblack-700 rounded-lg p-6">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="w-[300px]">
            <img src={course?.thumbnail} alt="" className={` w-full rounded-xl object-cover`} />
          </div>

          <div>
            <p>{course.courseName}</p>
            <p>{course?.instructor?.firstName}{course?.instructor?.lastName}</p>
            <div>
              <span>{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount}  />
              <span>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
