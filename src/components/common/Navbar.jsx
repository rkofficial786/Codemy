import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink } from "react-router-dom";

import { NavbarLinks } from "./../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
      console.log("Category", subLinks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  return (
    <div className="h-16 flex items-center justify-center border-b-[1px] border-b-richblack-700 border-opacity-40 shadow-richblack-700 shadow-lg">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link>
          <img src={logo} alt="" className="" loading="lazy" />
        </Link>

        <nav className="z-10 ">
          <ul className="grid grid-cols-4  items-center gap-6 text-richblack-200 cursor-pointer">
            {NavbarLinks.map((link, index) => {
              return (
                <li
                  className="navlink hover:text-richblack-5 transition-all ease-in-out duration-200"
                  key={index}
                >
                  {link.title === "Catalog" ? (
                    <div className="group relative  ">
                      <p className="flex gap-2 items-center">
                        {link.title}
                        <IoIosArrowDown />
                      </p>
                      <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute  left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 "></div>

                        {subLinks &&
                          subLinks.map((category, index) => {
                            return <div>{category.name}</div>;
                          })}
                      </div>
                    </div>
                  ) : (
                    <NavLink className={"text-richblack-200 hover:text-richblack-5"} to={link?.path}>
                      {link.title}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login signup  */}

        <div className="flex gap-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="bg-richblack-800 border-richblack-400 border-b border-r text-richblack-5 px-3 py-2 rounded-lg">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="bg-richblack-800 border-richblack-400 border-b border-r text-richblack-5 px-3 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
