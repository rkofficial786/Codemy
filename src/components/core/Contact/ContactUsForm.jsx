import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";
import countrycode from "../../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (!isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phone: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const submitContactForm = async (data) => {
    console.log("data", data);
    const {firstname ,lastname ,email ,phone,message} = data
    console.log("firstname",firstname);

    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        {
          firstname,lastname,email,message,phone
        }
      );
      console.log("response,", response);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitContactForm)}
        className="flex  flex-col gap-y-4"
      >
        <div className="flex gap-x-4">
          <div>
            <label
              htmlFor="firstname"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter First Name"
              {...register("firstname", { required: true })}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.firstname && (
              <span className="text-pink-400">Please enter your name</span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter Last Name"
              {...register("lastname")}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Email Address <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.email && (
            <span className="text-pink-400">Please enter your email</span>
          )}
        </div>
        {/* phoneno */}
        <div className="flex flex-col ">
          <label
            htmlFor="phone"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Phone Number <sup className="text-pink-200">*</sup>
          </label>

          <div className="flex ">
            {/* dropdown */}
            <div className="w-full">
              <select
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
                className="w-[80px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              >
                {countrycode.map((elem, index) => (
                  <option className="" value={elem.code} key={index} >
                    {elem.code} -  {elem.country}
                  </option>
                ))}
              </select>
            </div>

            {/* phone no. */}
            <div>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="1234567890"
                {...register("phone", {
                  required: { value: true, message: "Please Enter Phone" },
                  maxLength: { value: 10, message: "Invalid phone" },
                })}
                className=" w-full lg:w-[350px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </div>
          </div>

          {errors.phone && (
            <span className="text-pink-400">{errors.phone.message}</span>
          )}
        </div>

        {/* message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Message <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Enter Your Message Here"
            {...register("message", { required: true })}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          ></textarea>
          {errors.message && (
            <span className="text-pink-400">Please enter your message</span>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
