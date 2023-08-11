import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmModal from "./../../../common/ConfirmModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "./../../../../services/operations/courseDetailsAPI";

import { setCourse } from "../../../../slices/courseSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfiormationModal] = useState(false);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfiormationModal(null);
    setLoading(false);
  };
  return (
    <div className="text-white mt-16">
      <Table>
      <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              {/* <Td>No Courses Found</Td> */}
            </Tr>
          ) : (
            courses?.map((course) => {
              return (
                <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                  <Td className="flex gap-4">
                    <img
                      src={course?.thumbnail}
                      className="h-[150px] w-[220px] object-cover"
                      alt=""
                    />
                    <div className="overflow-hidden">
                      <p className="w-[200px]">{course.courseName}</p>
                      <p className="text-richblack-300 w-[260px]">{course.courseDescription.substring(0,60)}</p>
                      <p>Created: {course.createdAt}</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="text-pink-500">Drafted</p>
                      ) : (
                        <p className="text-caribbeangreen-300">Published</p>
                      )}
                    </div>
                  </Td>
                  <Td>2 hr 30 min</Td>
                  <Td className="text-caribbeangreen-50 text-[14px]">${course.price}</Td>
                  <Td>
                    <button className="mr-[10px]" onClick={()=>{
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }} disabled={loading}>
                      <AiFillEdit className="text-2xl text-yellow-50"/>
                    </button>
                    <button
                      onClick={() => {
                        setConfiormationModal({
                          text1: "Do you want to delete?",
                          text2: "All the data will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfiormationModal(null)
                            : () => {},
                        });
                      }}
                      disabled={loading}
                    >
                      <AiFillDelete className="text-2xl text-pink-300"/>
                    </button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
