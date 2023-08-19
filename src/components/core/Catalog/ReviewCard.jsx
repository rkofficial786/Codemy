import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="text-white">
      <div className="flex items-center justify-center gap-2">
        <img className="w-[40px] h-[40px] rounded-full object-cover" src={review?.user?.image} alt="" />

        <div>
            <p className="">{review.user.firstName} {review.user.lastName}</p>
            <p className="text-[12px] text-richblack-300">{review.course.courseName}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
