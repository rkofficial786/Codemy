import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillChatLeftDotsFill, BsGlobeAmericas } from "react-icons/bs";
import ContactUsForm from "../components/core/Contact/ContactUsForm";
import Footer from './../components/common/Footer';

const Contact = () => {
  return (
    <section>
    <div className="w-11/12 max-w-maxContent mt-[100px] mx-auto flex-wrap flex gap-10 justify-center ">
      <div className="p-10 h-fit text-richblack-5 flex flex-col gap-6 bg-richblack-800   lg:w-[40%] rounded-xl">
        {/* fisrt */}
        <div>
          <div className="flex items-center gap-5">
            <BsFillChatLeftDotsFill />
            <h1 className="text-2xl font-semibold">Chat on us</h1>
          </div>
          <p className="text-richblack-300">
            Our friendly team is here to help
          </p>
          <p className="text-richblack-300">excelshopping0@gmail.com</p>
        </div>

        

        {/* 2nd */}
        <div>
          <div className="flex items-center gap-5">
            <BsGlobeAmericas />
            <h1 className="text-2xl font-semibold">Visit us</h1>
          </div>
          <p className="text-richblack-300">Come and say hello to out office</p>
          <p className="text-richblack-300">
            Saitan gali khtra mahal Andher nagar <br />
            Samsan ke samne
          </p>
        </div>

        {/* 3rd */}
        <div>
          <div className="flex items-center gap-5">
            <BiSolidPhoneCall />
            <h1 className="text-2xl font-semibold">Call us</h1>
          </div>
          <p className="text-richblack-300">Mon-Fri from 8am to 5px</p>
          <p className="text-richblack-300">+1234567890</p>
        </div>
      </div>
      {/* form */}
      <div className="border-2 lg:w-[54%] border-richblack-400 p-10 rounded-xl">
        <div className="my-5">
          <h1 className="text-4xl font-bold text-white">Got a Idea? We've got the skills.</h1>
          <p className="text-richblack-300 mt-4">
            {" "}
            Let's team up Tell us more about yourself and what you're got in
            mind.
          </p>
        </div>
        <ContactUsForm />
      </div>
    </div>
  
  {/* review */}

  <div className="text-white">Reviews</div>
  <div>
    <Footer/>
  </div>
    </section>
  );
};

export default Contact;
