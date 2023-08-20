import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import Button from "./Button";
const InstructionSection = () => {
  return (
    <div className=" flex-wrap  mx-auto bg-gradient-to-b pt-[100px] from-customewhite justify-center to-richblack-900  flex gap-10">
      <div className="md:w-[40%] relative w-11/12 ">
        <img
          src={instructor}
          alt=""
          className="shadow-white border-r-8 border-white border-b-8 rounded-lg"
        />
      </div>

      <div className="flex flex-col w-11/12  gap-8 md:w-[40%]">
        <div className="text-4xl font-semibold">
          Become an
          <HighLightText text={"Instructor"} />
        </div>

        <p className="text-pure-greys-25 md:text-black">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ipsa
          excepturi recusandae minus debitis? Quidem eligendi recusandae
          temporibus similique magni, explicabo natus incidunt eum repellat
          rerum, veniam harum commodi porro!
        </p>

        <div className="w-fit">
          {" "}
          <Button active={true} linkto={"/signup"}>
            Start Teaching Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
