import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineimage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: logo1,
    heading: "LeaderShip",
    Description: "Full commited with the company",
  },
  {
    logo: logo2,
    heading: "LeaderShip",
    Description: "Full commited with the company",
  },
  {
    logo: logo3,
    heading: "LeaderShip",
    Description: "Full commited with the company",
  },
  {
    logo: logo4,
    heading: "LeaderShip",
    Description: "Full commited with the company",
  },
];

const TimelineSection = () => {
  return (
    <div className="text-white mt-20 ">
      <div className="flex flex-row gap-9 w-11/12 mx-auto items-center flex-wrap justify-evenly">
        <div className="flex flex-col gap-12 ">
          {timeline.map((elem, index) => {
            return (
              <div key={index} className="flex flex-row gap-5">
                <div className="relative">
                  <img className="h-[50px] w-[50px]" src={elem.logo} alt="" />
                  {index !== 3 && (
                    <div className="h-14 w-1 absolute left-6 border-l-2 border-dashed "></div>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl">{elem.heading}</h2>
                  <p className="text-base">{elem.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-300">
          <img
            src={timelineimage}
            className="rounded-lg shadow-xl shadow-blue-50 h-fit"
            alt="TimelineImage"
          />
          <div className="bg-richblack-800 flex-wrap flex flex-row absolute -bottom-10 md:left-[15%] justify-evenly gap-12  p-5">
            <div className="flex justify-center md:border-r md:pr-14 items-center gap-6">
              <h2 className="text-2xl md:text-5xl">10</h2>
              <div>
                <p className="text-richblack-500">Years</p>
                <p className="text-richblack-500">Experience</p>
              </div>
            </div>
            <div className="flex justify-center   items-center gap-6">
              <h2 className=" text-2xl md:text-5xl">250</h2>
              <div>
                <p className="text-richblack-500">Types</p>
                <p className="text-richblack-500">of Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
