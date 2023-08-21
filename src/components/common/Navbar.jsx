import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import logo2 from "../../assets/Logo/Logo-Small-Light.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { NavbarLinks } from "./../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import { BsCart3, BsFillCartFill } from "react-icons/bs";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const [hovering,setHovering] =useState(false)

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
  const navigate = useNavigate();
  return (
    <div className="h-16 flex nav-bar yaha items-center justify-center border-b-[1px] border-b-richblack-700 border-opacity-40 shadow-richblack-700 shadow-lg">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link>
          <img src={logo} alt="" className="hidden md:block" loading="lazy" />
          <img src={logo2} alt="" className="md:hidden" loading="lazy" />
        </Link>

        <nav className=" ">
          <ul className="grid grid-cols-4 mx-2 items-center lg:gap-6 text-richblack-200 cursor-pointer">
            {NavbarLinks.map((link, index) => {
              return (
                <li
                  className="navlink  hover:text-richblack-5 transition-all ease-in-out duration-200"
                  key={index}
                >
                  {link.title === "Catalog" ? (
                    <div className="group relative  ">
                      <p className="flex md:gap-2  pr-5  md:m-0 items-center text-sm md:text-md ">
                        {link.title}
                        <IoIosArrowDown className="text-lg"/>
                      </p>
                      <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[10%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute  left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 "></div>

                        {subLinks &&
                          subLinks.map((category, index) => {
                            return (
                              <div
                                className="hover:bg-richblack-50 rounded-xl px-2 py-[2px] text-[20px]"
                                onClick={() => {
                                  navigate(
                                    `/catalog/${category.name
                                      .split(" ")
                                      .join("-")}`
                                  );
                                }}
                              >
                                {category.name}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      className={"text-richblack-200 text-sm md:text-md hover:text-richblack-5"}
                      to={link?.path}
                    >
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
          {user && user?.accountType !== "Instructor" && (cart.length ? (
              <Link  onMouseLeave={()=>setHovering(false)} onMouseEnter={()=>setHovering(true)}
                to={"/dashboard/cart"}
                className="text-white relative text-xl"
              >
                <BsFillCartFill className="" />
                <span className={`-top-3  text-center -right-3 absolute bg-yellow-25 w-5 h-5 text-[15px] flex items-center justify-center rounded-full text-black shadow-lg shadow-yellow-50 ${hovering?"":"circle"}  `}>{cart.length}</span>
              </Link>
            ) : (
              <Link to={"/dashboard/cart"} className="text-white text-xl">
                <BsCart3 />
              </Link>
            ))}

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
