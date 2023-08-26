import React from "react";
import ReactStars from "react-stars";
import RatingStars from "../../common/RatingStars";
import { NavLink } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const containerStyle = {
    // minHeight: '100vh',
    width: "100%",
    position: "relative",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${review.course.thumbnail})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <NavLink to={`/courses/${review?.course._id}`}>
      <div
        className={`text-white hover:scale-95 transition-all ease-in-out duration-300 w-[300px] hover:shadow-inner  hover:shadow-black rounded-lg bg-richblack-800 p-4 h-[200px] flex gap-3 flex-col `}
        style={containerStyle}
      >
        <div className="flex items-center  gap-2">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={review?.user?.image}
            alt=""
          />

          <div>
            <p className="">
              {review.user.firstName} {review.user.lastName}
            </p>
            <p className="text-[12px] text-richblack-300">
              {review.course.courseName}
            </p>
          </div>
        </div>

        <div>
          <p className="overflow-hidden">
            {review.review.length > 140 ? (
              <div>
                <span className="hidden  md:block">{review.review.substring(0, 140)}...</span>
                <span className="md:hidden h-[100px] text-[13px]">{review.review.substring(0, 100)}...</span>
              </div>
            ) : (
              <span className="max-h-[100px] overflow-hidden ">{review.review}</span>
            )}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <p> {review.rating}</p>
          <RatingStars Review_Count={review.rating} />
        </div>
      </div>
    </NavLink>
  );
};

export default ReviewCard;
