import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import HighLightText from "../components/core/HomePage/HighLightText";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Loader from "../components/common/Loader";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {loading ? (
        <div><Loader/></div>
      ) : (
        <div className="text-white mx-[5%]  ">
          <h1 className="text-3xl font-bold mb-4">
            Verify <HighLightText text="Email" />
          </h1>
          <p className="text-richblack-300 mb-6">
            A verification email has been sent to your email address.
          </p>
          <form onSubmit={handleOnSubmit} className="">
          <OTPInput
           
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} className="bg-richblack-800 w-[140px]  text-3xl  border-2 m-2  text-white " />}
              placeholder="-"
             
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-6 rounded bg-yellow-50 text-richblack-900 font-medium "
            >
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
          <div>
            <Link to="/login" className="text-blue-100 hover:text-blue-500 text-sm flex gap-2 items-center">
            <AiOutlineArrowLeft/>
              Back to login
            </Link>
          </div>
            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="text-sm text-richblack-300 hover:text-richblack-5  focus:outline-none "
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
