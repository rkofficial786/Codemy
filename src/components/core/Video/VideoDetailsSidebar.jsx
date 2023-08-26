import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BtnIcon from "../../common/BtnIcon";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoActive, setvideoActive] = useState("");

  const navigate = useNavigate();

  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const location = useLocation();

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setvideoActive(activeSubSectionId);
      console.log("cc", completedLectures);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className="lg:border-r-[1px]   mx-auto 2xl:w-[450px] lg:mt-5 border-richblack-300  2xl:fixed h-full">
      <div>
        {/* heading  */}
        <div>
          {/* button */}
          <div className="flex mb-3 justify-between items-center">
            <div
              className="ml-3 hidden lg:block cursor-pointer text-2xl"
              onClick={() => navigate("/dashboard/enrolled-courses")}
            >
              <MdOutlineKeyboardBackspace />
            </div>

            <div className="mr-3 ml-3">
              <BtnIcon
                text={"Add Review"}
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>
          <div className="flex pl-3 lg:pl-0 w-[90%] mb-3  justify-between">
            <p className="w-[90%] text-lg">{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length}/{totalNoOfLectures}
            </p>
          </div>
        </div>
        {/* sections and subsection */}

        <div className="">
          {courseSectionData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div
                className="cursor-pointer flex justify-between items-center bg-richblack-700  shadow-white border-y p-2 "
                onClick={() => setActiveStatus(section?._id)}
              >
                <div className="flex w-full justify-between items-center">
                  <span> {section?.sectionName} </span>
                  {activeStatus === section?._id ? (
                    <span>
                      <RiArrowDropDownLine className="text-3xl rotate-180 transition-all ease-in-out duration-500" />
                    </span>
                  ) : (
                    <span>
                      <RiArrowDropDownLine className="text-3xl" />
                    </span>
                  )}
                </div>
                <div>{/* Add an icon here for expanding/collapsing */}</div>
              </div>
              {activeStatus === section?._id && (
                <div className="space-y-2">
                  {section.subSection.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className={`cursor-pointer flex gap-3 items-center p-2 shadow-inner  ${
                        videoActive === topic._id
                          ? "bg-yellow-25 text-white bg-opacity-40"
                          : "bg-richblack-200 text-richblack-25 bg-transparent"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        );
                        setvideoActive(topic?._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(topic?._id)}
                        onChange={() => {}}
                        className="mr-2"
                      />
                      <div>{topic?.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
