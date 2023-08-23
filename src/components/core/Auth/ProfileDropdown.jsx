import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";
import { CgProfile } from "react-icons/cg";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import {HiComputerDesktop} from "react-icons/hi"
import { RiComputerLine } from "react-icons/ri";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className=" sm:w-[30px]  w-[50px] rounded-full object-cover aspect-square "
        />
        <AiOutlineCaretDown className=" text-sm hidden md:block text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg md:block hidden" />
              <CgProfile className="text-lg md:hidden" />
              <span className="lg:block hidden">Dashboard</span>
              <span className="lg:hidden">Profile</span>
            </div>
          </Link>

          {/* for mobile only  */}
          {/* students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link
              to="/dashboard/enrolled-courses"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <BiSolidDashboard className="text-lg" />
                Courses
              </div>
            </Link>
          )}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link
              to="/dashboard/settings"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <IoMdSettings className="text-lg" />
                Setting
              </div>
            </Link>
          )}

          {/* <Link to="/dashboard/enrolled-courses"   className="lg:hidden" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <BiSolidDashboard className="text-lg" />
           Courses
            </div>
          </Link>

          <Link to="/dashboard/settings" className="lg:hidden" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <IoMdSettings className="text-lg" />
             Setting
            </div>
          </Link> */}

          {/* instructor */}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/instructor"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <VscDashboard className="text-lg" />
                DashBoard
              </div>
            </Link>
          )}


{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/my-courses"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <RiComputerLine className="text-lg" />
                Courses
              </div>
            </Link>
          )}




          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/settings"
              className="lg:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <IoMdSettings className="text-lg" />
                Setting
              </div>
            </Link>
          )}

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
