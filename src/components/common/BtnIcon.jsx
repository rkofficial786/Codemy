import React from "react";
import * as Icons from "react-icons/vsc"

const BtnIcon = ({ text, onClick, disabled, type,iconName }) => {

  const Icon = Icons[iconName]
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`${
          disabled === true
            ? "bg-richblack-600 text-white"
            : "bg-yellow-100 text-richblack-800"
        } hover:shadow-lg hover:border-opacity-50 py-1 px-[12px] flex items-center gap-1 hover:scale-95 transition-all duration-200 rounded-lg shadow-md shadow-yellow-500 text-[17px]`}
      >
        {Icon && <Icon className="text-lg" />}
        {text}
      </button>
      
      
    </div>
  );
};

export default BtnIcon;
