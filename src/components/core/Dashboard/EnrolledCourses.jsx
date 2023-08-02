import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Loader from "../../common/Loader";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const getEnrolledCourse = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourse(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourse();
  },[]);

  return (
    <div>
      {!enrolledCourse ? (
        <Loader />
      ) : !enrolledCourse.length ? (
        "You Have not enrolled in any course"
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>
          {/* card */}
          {enrolledCourse.map((course, index) => {
            return (
              <div>
                <div>
                  <img src={course.thumbnail} alt="" />
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                  </div>
                </div>

                <div>{course?.totalDuration}</div>

                <div>
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height={"8px"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
