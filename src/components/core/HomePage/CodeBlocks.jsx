import React from "react";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";






const CodeBlocks = ({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  codeblock,
  backgroundGradient,
  codecolor,
}) => {

 
 



  return (
    <div className={`flex ${position} my-20 justify-between flex-wrap sm:flex-nowrap`}>
      {/* section 1 */}

      <div className="lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>

        <div className="flex gap-6 items-center ">
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className="flex items-center justify-center gap-3">
              {btn1.btnText}
              <FaArrowRight />
            </div>
          </Button>

          <Button active={btn2.active} linkto={btn2.linkto}>
            {btn2.btnText}
          </Button>
        </div>
      </div>

      {/* section 2 */}
      <div className="flex flex-row h-fit mt-8 w-[100%] lg:w-[500px] bg-opacity-30 bg-richblue-900 backdrop-filter backdrop-blur-lg">
        {/* create gradient todo */}


     

       

   


        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor}`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
