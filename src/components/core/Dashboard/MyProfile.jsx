import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BtnIcon from "../../common/BtnIcon";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useRef } from "react";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [isImageShowing, setIsImageShowing] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsImageShowing(false));

  return (
    <div className="text-white mx-auto flex w-11/12 flex-col justify-center  gap-12 items-center">
      <h1 className="text-4xl font-semibold ">My profile</h1>

      <img
            onClick={() => setIsImageShowing(true)}
            src={user?.image}
            alt=""
            className="aspect-square  md:hidden w-[70px] rounded-full object-cover"
          />

      {/* section 1 */}
      <div className="bg-richblack-800 flex justify-between items-center  min-w-[360px] w-7/12 p-8 rounded-xl">
        <div className="flex items-center gap-5">
          <img
            onClick={() => setIsImageShowing(true)}
            src={user?.image}
            alt=""
            className="aspect-square md:block hidden w-[70px] rounded-full object-cover"
          />
          <div>
            <p className="text-2xl">{user?.firstName + " " + user?.lastName}</p>
            <p className="text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <BtnIcon
          text={"Edit"}
          disabled={false}
          onClick={() => {
            navigate("/dashboard/settings");
          }}
          iconName={"VscEdit"}
        />
      </div>

      {/* section 2 */}

      <div className="bg-richblack-800 min-w-[360px] w-7/12 p-8 rounded-xl">
        <div className="flex justify-between w-full">
          <p className="text-2xl">About</p>
          <BtnIcon
            text={"Edit"}
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            iconName={"VscEdit"}
          />
        </div>
        <p className="text-richblack-400 mt-3">
          {user?.additionalDetails?.about ?? "Write something about Yourself"}
        </p>
      </div>

      {/* section 3 */}

      <div className="bg-richblack-800  min-w-[360px] w-7/12 p-8 rounded-xl">
        <div className="flex justify-between items-center ">
          <p className="text-2xl">Personal Details</p>
          <BtnIcon
            text={"Edit"}
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            iconName={"VscEdit"}
          />
        </div>

        {/* details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[50px]">
          <div className="">
            <p className="text-richblack-300 mt-3">First Name</p>
            <p className="font-semibold">{user?.firstName}</p>
          </div>

          <div>
            <p className="text-richblack-300 mt-3">Last Name</p>
            <p className="font-semibold">{user?.lastName}</p>
          </div>

          <div>
            <p className="text-richblack-300 mt-3">Email</p>
            <p className="font-semibold ">{user?.email}</p>
          </div>

          <div>
            <p className="text-richblack-300 mt-3">Contact</p>
            <p className="font-semibold">
              {user?.additionalDetails?.contactNumber ?? "Add Contact"}
            </p>
          </div>
          <div>
            <p className="text-richblack-300 mt-3">Date of Birth</p>
            <p className="font-semibold">
              {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
            </p>
          </div>
          <div>
            <p className="text-richblack-300 mt-3">Gender</p>
            <p className="font-semibold">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
        </div>
      </div>

      {isImageShowing && (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-50 backdrop-blur-sm">
          <img ref={ref} 
            src={user?.image}
            className="w-[300px] object-cover h-[300px] aspect-square rounded-full"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
