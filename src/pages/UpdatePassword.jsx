import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineArrowLeft } from "react-icons/ai";
import HighLightText from "../components/core/HomePage/HighLightText";
import Loader from "../components/common/Loader";
import { Helmet } from "react-helmet";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {loading ? (
        <div><Loader/></div>
      ) : (
        <div className="text-white w-80">
          <Helmet > <title>Update Password</title></Helmet>
          <h1 className="text-3xl font-bold mb-4">Choose New <HighLightText text={"Password"}/></h1>
          <p className="text-richblack-300 mb-6">Almost Done. Enter your new password and you're all set.</p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
            <label className="mb-4">
              <p className="text-sm mb-1">New Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="New Password"
                  className="w-full px-4 py-2 rounded bg-richblack-800 text-richblack-5"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </label>

            <label className="mb-4">
              <p className="text-sm mb-1">Confirm New Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 rounded bg-richblack-800 text-richblack-5"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded bg-yellow-50 text-richblack-900 font-medium mb-4"
            >
              Reset Password
            </button>
          </form>

          <div>
            <Link to="/login" className="text-blue-100 text-sm flex gap-2 items-center">
            <AiOutlineArrowLeft/>
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
