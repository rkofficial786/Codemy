import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import HighLightText from "../components/core/HomePage/HighLightText";
import Button from "../components/core/HomePage/Button";
import BannerVideo from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import { FaArrowRight } from "react-icons/fa";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructionSection from "../components/core/HomePage/InstructionSection";
import TabSection from "../components/core/HomePage/TabSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className="relative mx-auto  flex max-w-maxContent flex-col w-11/12 items-center text-white justify-between gap-8">
        <Link to={"/signup"} >
          <div className="group mx-auto p-1 relative  mt-7 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center  justify-center gap-4 rounded-full transition-all duration-200 group-hover:bg-richblack-900 py-2 px-10">
              <p>Become an Instructor</p>
              <AiOutlineArrowRight className="group-hover:translate-x-8 transition-all ease-in-out duration-300" />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold ">
          Empower Your Future with <HighLightText text={"Coding Skills"} />
        </div>
        <div className="w-[90%] text-center text-richblack-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At modi,
          expedita, consectetur reprehenderit odit consequatur, dolore magnam
          similique voluptatem et nesciunt itaque ipsum praesentium iusto
          suscipit exercitationem adipisci quam provident!
        </div>

        <div className="flex gap-7 items-center justify-center">
          <Button active={true} linkto={"/signup"}>
            Learn More
          </Button>
          <Button active={false} linkto={"/login"}>
            Book a Demo
          </Button>
        </div>

        <div className="relative box-shadow-top-30px-20px mt-6">
          <div className="inset-0 w-full h-full bg-white absolute top-5 left-5 rounded-xl"></div>

          <video className="relative z-10" muted loop autoPlay>
            <source src={BannerVideo} />
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-extrabold">
                Unlock your <HighLightText text={"coding potential"} />
                with Our Online Courses
              </div>
            }
            subheading={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore provident aperiam illum labore assumenda? Accusamus vitae aliquid enim similique."
            }
            btn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codecolor={"text-yellow-300"}
            backgroundGradient={""}
            codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a basic HTML document.</p>
</body>
</html>`}
          />
        </div>

        {/*code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-extrabold">
                Start <HighLightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempore provident aperiam illum labore assumenda? Accusamus vitae aliquid enim similique."
            }
            btn1={{
              btnText: "Continue Lessons",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codecolor={"text-pink-200"}
            backgroundGradient={""}
            codeblock={`<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a basic HTML document.</p>
</body>
</html>`}
          />
        </div>
      </div>

      {/* section 2 */}

      <div class="h-auto bg-gradient-to-b from-richblack-900 to-richblue-500  ">
            {/* tab section  */}
        <div className="w-11/12 mx-auto">
          <TabSection/>
        </div>

        <div className="w-11/12 max-w-maxContent flex items-center mx-auto gap-6">
          <div className="flex flex-row gap-6 mt-[50px] justify-center w-full text-white">
            <Button active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </Button>
            <Button active={false} linkto={"/signup"}>
              <div className="flex items-center gap-3">Learn More</div>
            </Button>
          </div>
        </div>

        <div className="w-11/12 text-white max-w-maxContent flex flex-col items-center mx-auto gap-6">
          <div className="flex mt-28 flex-wrap gap-6 justify-center flex-row">
            <div className="text-4xl font-semibold  md:w-[45%]">
              Get the Skills you need for a{" "}
              <HighLightText text={"job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 md:w-[50%] items-start">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                iusto esse itaque. Consequuntur, sunt odit esse magni doloribus
                repellendus quas rerum. Sit maiores,
              </div>
              <Button active={true} linkto={"signup"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <TimelineSection />

        <div className="pb-[100px]  bg-gradient-to-b from-customblue via-blue-600 to-white mt-[100px]">
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}

      <div className=" mx-auto   ">
        <InstructionSection />

        <h2 className="text-center text-4xl text-white mt-[200px]">
          Review from Other Learners
        </h2>

        <ReviewSlider/>

        <div>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
