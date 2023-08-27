import React, { useState } from "react";
import { HomePageExplore } from "./../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard";
import ReactVisibilitySensor from "react-visibility-sensor";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const TabSection = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  // Mobile select state
  const [mobileSelectedTab, setMobileSelectedTab] = useState(tabsName[0]);

  const setMycards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  // Function to handle mobile select change
  const handleMobileSelectChange = (event) => {
    const value = event.target.value;
    setMobileSelectedTab(value);
    setMycards(value);
  };



  

  return (
    <div className="text-white mx-auto relative">
      <div>
        <div className="text-4xl font-semibold text-center">
          Unlock the
          <HighLightText text={"Power of code"} />
        </div>
        <p className="text-richblack-400 mt-5 text-center">
          Learn to build anything you can imagine
        </p>
      </div>

      {/* Tabs for desktop */}
     
      <div className="md:flex hidden items-center gap-5 justify-center bg-richblack-800 w-fit mx-auto rounded-full mt-[60px]  ">
        {tabsName.map((tab, index) => (
          <div
            key={index}
            className={`text-[16px]  items-center ${
              currentTab === tab
                ? "bg-richblack-900 text-richblack-5"
                : " text-richblack-200"
            }  transition-all ease-in-out duration-200  hover:text-richblack-5 px-4 py-2 cursor-pointer`}
            onClick={() => setMycards(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
     

      {/* Select for mobile */}
      <div className="flex items-center gap-5 justify-center bg-richblack-800 mx-auto rounded-2xl mt-[30px] w-[200px] md:hidden">
        <select
          className="text-white bg-transparent border-none focus:outline-none py-5 px-2 focus:rounded-2xl focus:bg-richblack-800 focus:text-richblack-5"
          value={mobileSelectedTab}
          onChange={handleMobileSelectChange}
        >
          {tabsName.map((tab, index) => (
            <option
              key={index}
              value={tab}
              className="bg-richblack-800 py-2 cursor-pointer  "
            >
              {tab}
            </option>
          ))}
        </select>
      </div>

      {/* Course cards */}
      <div className="flex lg:flex-nowrap flex-wrap items-center justify-center gap-16 mt-[40px] md:mt-[100px]">
        {courses.map((course, index) => (
          <div key={index}>
            <CourseCard
              course={course}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSection;
