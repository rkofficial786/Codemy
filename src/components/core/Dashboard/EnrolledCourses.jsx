import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Loader from "../../common/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BtnIcon from "../../common/BtnIcon";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const getEnrolledCourse = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("enrolled course", enrolledCourse);
      setEnrolledCourse(response);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourse();
  }, []);
  const navigate = useNavigate();

  console.log("courseenrolled",enrolledCourse);

  return (
    <div className="mx-auto w-10/12 text-white">
      {!enrolledCourse ? (
        <Loader />
      ) : !enrolledCourse.length ? (
        <div className="flex justify-center items-center text-center">
        <span>You Have not enrolled in any course</span>
        <BtnIcon text={"Buy Course"}  onClick={()=>navigate("/catalog/Web-Development")}/></div>
        
      ) : (
        <div>
          <Table className="">
            <Thead className=" ">
              <Tr className="border-2  rounded-md  bg-richblack-600">
                <Th className="text-left px-3">Name</Th>
                <Th className="text-left">Duration</Th>
                <Th className="text-left">Progress</Th>
              </Tr>
            </Thead>

            <Tbody>
              {enrolledCourse?.map((course, index) => {
                return (
                  <Tr
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                    className="p-6 border-[1px] cursor-pointer border-richblack-400"
                  >
                    <Td className="flex gap-2 md:w-[60%] p-6 ">
                      <img src={course.thumbnail} alt="" className="w-40 " />
                      <div>
                        <p className="font-semibold ">{course.courseName}</p>
                        <p className="text-xs text-richblack-300">
                          {course.courseDescription.length > 50
                            ? `${course.courseDescription.slice(0, 50)}...`
                            : course.courseDescription}
                        </p>
                      </div>
                    </Td>

                    <Td className="md:w-[20%]">
                      <p>{course?.totalDuration}</p>
                    </Td>

                    <Td className="md:w-[20%] ">
                      <p className="mb-1">
                        Progress: {course.progressPercentage || 0}%
                      </p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height={"13px"}
                        className="lg:w-[200px] text-sm"
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
