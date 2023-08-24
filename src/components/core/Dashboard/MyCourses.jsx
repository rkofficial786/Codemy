import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import BtnIcon from "./../../common/BtnIcon";
import CourseTable from "./InstructorCourses/CourseTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);

  if(courses.length===0 ){
    return (
      <div>
        No Courses found
      </div>
    )
  }
  return (
    <div>
      <div className="flex justify-between gap-1 items-center">
        <h1 className="text-3xl">My Courses</h1>
        <BtnIcon
          text={"Add course"}
          onClick={() => navigate("/dashboard/add-course")}
        />
      </div>

     {courses && <CourseTable courses={courses} setCourses={setCourses}/>}


    </div>
  );
};

export default MyCourses;
