import React from "react";
import HighLightText from "./HighLightText";
import img1 from "../../../assets/Images/Know_your_progress.png";
import img2 from "../../../assets/Images/Compare_with_others.png";
import img3 from "../../../assets/Images/Plan_your_lessons.png";
import Button from "./Button";

const LearningLanguageSection = () => {
  return ( 
    <div className="text-white   pt-[100px]">
      <div className="font-semibold t-[100px] text-center w-11/12 mx-auto">
        <h1 className="text-4xl">
          Your Swiss knife for <HighLightText text={"learning any language"} />
        </h1>
        <p className="mt-5 md:w-[40%] mx-auto text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque,
          placeat ab voluptas laudantium laboriosam nesciunt velit sequi
          corporis excepturi aliquid.
        </p>
      </div>

      <div className="flex flex-row items-center justify-center ">
        <img src={img1} alt="" className="object-contain  w-52 md:w-64 lg:w-auto -mr-32" />
        <img src={img2} alt="" className="object-contain  w-52  md:w-64 lg:w-auto -mr-16" />
        <img src={img3} alt="" className="object-contain  w-52 md:w-64 lg:w-auto -ml-16" />
      </div>

      <div className="w-fit mx-auto"><Button active={true} linkto={"/login"}>Learn More</Button></div>
    </div>
  );
};

export default LearningLanguageSection;
