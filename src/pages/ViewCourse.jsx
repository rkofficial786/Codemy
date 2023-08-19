import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import CourseReviewModal from "../components/core/Video/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/Video/VideoDetailsSidebar";




const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const { courseId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log("Course Data here... ", courseData.courseDetails)
      console.log("courseDara", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 


  return (
    <div className="absolute top-0 inset-0  bg-richblack-900">
      <style>
    {`
      .yaha {
        display: none;
      }
    `}
  </style>
      <div className="text-white">
        <div className="lg:flex flex w-screen flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[25%] bg-richblack-900  text-white relative min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
          <div className="h-[calc(100vh-3.5 rem)] lg:w-[75%]  overflow-hidden">
            <div className=" z-1000 bg-richblack-900  ml-auto flex items-center justify-center  py-10">
              <Outlet />
            </div>
          </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </div>
  );
};

export default ViewCourse;
