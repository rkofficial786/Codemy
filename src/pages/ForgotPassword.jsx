import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HighLightText from "../components/core/HomePage/HighLightText";
import Loader from "../components/common/Loader";

const ForgotPassword = () => {
  const [emailSent, setEmailsent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailsent));
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      {loading ? (
        <div><Loader/></div>
      ) : (
        <div className="text-white w-80">
          <h1 className="text-3xl font-bold mb-4">
            {!emailSent ? (
              <div>
                {
                  <>
                    Reset Your
                    <HighLightText text="Password" />
                  </>
                }
              </div>
            ) : (
              <div>
                {
                  <>
                   Check Your
                    <HighLightText text="Mail" />
                  </>
                }
              </div>
            )}
          </h1>
          <p className="text-richblack-300 mb-6">
            {!emailSent
              ? "We will email you instructions to reset your password. Please enter your email address below."
              : `We have sent the reset email to ${email}.`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="mb-4">
                <p className="text-sm mb-1">Email Address:</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 rounded bg-richblack-800 text-richblack-5"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded mt-8 bg-yellow-50 text-richblack-900 font-medium mb-4"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link
              to="/login"
              className="text-blue-100 text-sm flex gap-2 items-center"
            >
              <AiOutlineArrowLeft />
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
