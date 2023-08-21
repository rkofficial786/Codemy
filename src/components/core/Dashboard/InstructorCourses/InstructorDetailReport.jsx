import React from "react";
import Formateprice from "../../../common/Formateprice";
import BtnIcon from "../../../common/BtnIcon";

const InstructorDetailReport = ({ courses, setDetailReport }) => {
  return (
    <div className="w-screen">
      <div className="flex w-8/12 mx-auto justify-between items-center">
        <h1 className="text-3xl">My Courses</h1>
        <BtnIcon
          text={"Graph report"}
          onClick={() => setDetailReport(false)}
        />
      </div>

      <div className="text-white mt-16 w-8/12 mx-auto ">
        <div className="text-left  grid-col-1 lg:grid-cols-5 gap-4 border-t border-b hidden lg:grid border-richblack-800">
          <div className="py-2 text-richblack-100 font-medium lg:col-span-2">
            Courses
          </div>
          <div className="py-2 px-2 text-richblack-100 font-medium lg:col-span-1">
            Price
          </div>
          <div className="py-2 text-richblack-100 font-medium lg:col-span-1">
            Enrolls
          </div>
          <div className="py-2 text-richblack-100 font-medium lg:col-span-1">
            Income
          </div>
        </div>

        {courses.length === 0 ? (
          <p className="py-4 px-4">No Courses Found</p>
        ) : (
          courses?.map((course) => {
            return (
              <div
                key={course._id}
                className="grid grid-col-1 lg:grid-cols-5 gap-4 py-3 px-4 border-t border-b border-richblack-800"
              >
                <div className="flex items-center col-span-2">
                  <img
                    src={course?.thumbnail}
                    className="h-20 w-32 object-cover mr-4"
                    alt=""
                  />
                  <div>
                    
                    <p>{course.courseName.length>30?(<span>{course.courseName.substring(0,30)}...</span>):(<span>{course.courseName}</span>)}</p>
                    <p className="text-richblack-300 hidden lg:block">
                      {course.courseDescription.substring(0, 60)}
                    </p>
                    <p className="text-richblack-500">
                      Created: {course.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 px-2">
                    <span className="lg:hidden">Price:  </span>
                  <Formateprice price={course.price} />
                </div>
                <div className="col-span-1 px-2 text-caribbeangreen-50 text-[14px]">
                <span className="lg:hidden">Enrolls:  </span>
                  {course?.studentsEnroled?.length}
                </div>
                <div className="col-span-1 px-4">
                <span className="lg:hidden">Income:  </span>
                  <Formateprice price={course.price * course?.studentsEnroled?.length}/>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default InstructorDetailReport;
