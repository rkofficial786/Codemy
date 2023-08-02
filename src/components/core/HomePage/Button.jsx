import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <div>
      <Link to={linkto}>
        <div
          className={`text-center text-[15px] py-2 px-4 font-bold rounded-md shadow-md ${
            active
              ? "bg-yellow-50 text-black border-yellow-500"
              : "bg-richblack-800 text-white border-richblack-700"
          } hover:shadow-lg hover:border-opacity-50 hover:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 active:ring-2 active:ring-pink-300`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export default Button;
