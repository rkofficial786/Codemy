import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Loader from "../../common/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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

  return (
    <div className="mx-auto w-10/12 text-white">
      {!enrolledCourse ? (
        <Loader />
      ) : !enrolledCourse.length ? (
        "You Have not enrolled in any course"
      ) : (
        <div>
          <Table className="" >
            <Thead  className="rounded-xl">
              <Tr className="rounded-tl-lg rounded-tr-lg border-2  rounded-md  bg-richblack-600">
                <Th  className="text-left px-3">Name</Th>
                <Th  className="text-left">Duration</Th>
                <Th  className="text-left">Progress</Th>
              </Tr>
            </Thead>

            <Tbody>
              {enrolledCourse?.map((course, index) => {
                return (
                  <Tr className="p-6 border-[1px] border-richblack-400">
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
                      <p>2 Hr 22 Min</p>
                    </Td>

                    <Td className="md:w-[20%] ">
                      <p className="mb-1">Progress: {course.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height={"8px"}
                       className="lg:w-[200px]"
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
