import React from "react";
import { BiSolidGroup } from "react-icons/bi";
import { BsBezier } from "react-icons/bs";

const CourseCard = ({ course, currentCard, setCurrentCard, index }) => {
  // console.log(course);
  return (
    <div className={`lg:w-[350px]  h-[300px] relative p-5 ${index === 0 ? "bg-white border-yellow-100 border-b-8 border-r-8 rounded-xl" : "bg-richblack-700 shadow-xl shadow-richblack-700"}`}>
      <div className="flex flex-col gap-7 lg:mb-10">
        <h1 className={`text-3xl ${index === 0 ? "text-richblack-900" : ""}`}>{course.heading}</h1>
        <p className="text-richblack-300"> {course.description}</p>
      </div>

      <div className="h-[1px] w-full bg-richblack-300"></div>

      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-2">
          <BiSolidGroup className={` ${index === 0 ? "text-caribbeangreen-300" : ""}`} />
          <h2 className={` ${index === 0 ? "text-richblack-900" : ""}`}>{course.level}</h2>
        </div>

        <div className="flex items-center gap-2">
          <BsBezier className={` ${index === 0 ? "text-caribbeangreen-300" : ""}`} />
          <h2 className={` ${index === 0 ? "text-richblack-900" : ""}`}>{course.lessionNumber} Lessions</h2>
        </div>
      </div>

     
    </div>
  );
};

export default CourseCard;
