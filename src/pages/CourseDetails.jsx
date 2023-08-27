import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/StudentFeaturesApi";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Loader from "../components/common/Loader";
import Error from "./Error";
import ConfirmModal from "../components/common/ConfirmModal";
import RatingStars from "../components/common/RatingStars";
import { formattedDate } from "./../utils/dateFormatter";
import { AiFillExclamationCircle, AiFillVideoCamera } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import copy from "clipboard-copy";
import { BsGlobe } from "react-icons/bs";
import { BiSolidRightArrow } from "react-icons/bi";
import { toast } from "react-hot-toast";
import Footer from "./../components/common/Footer";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";
import HighLightText from "./../components/core/HomePage/HighLightText";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));
  const { cart } = useSelector((state) => state.cart);

  const [courseinCart, setCourseinCart] = useState(false);

  //collapse section\

  //subsection
  const [openSectionIndexes, setOpenSectionIndexes] = useState([]);

  const toggleSection = (index) => {
    if (openSectionIndexes.includes(index)) {
      setOpenSectionIndexes((prevIndexes) =>
        prevIndexes.filter((i) => i !== index)
      );
    } // Close the clicked section }
    else {
      setOpenSectionIndexes((prevIndexes) => [...prevIndexes, index]); // Open the clicked section
    }
    // console.log("index", openSectionIndexes);
  };

  const handleCopy = () => {
    const currentUrl = window.location.href;
    copy(currentUrl)
      .then(() => toast.success("URL copied to clipboard"))
      .catch(() => toast.error("Failed to copy URL"));
  };

  //buy course
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    } else {
      setConfirmationModal({
        text1: "you are not Logged in",
        text2: "Please Login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };
  const [isArrowDown, setIsArrowDwon] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        console.log("Could not detch course Details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAvgRecviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails?.ratingAndReviews
    );
    setAvgRecviewCount(count);
  }, [courseData]);

  const [totalLectures, setTotalLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalLectures(lectures);
  }, [courseData]);

  if (loading || !courseData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnroled,
    createdAt,
    instructions,
  } = courseData.data?.courseDetails;

  const containerStyle = {
    // minHeight: '100vh',
    width: "100%",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url(${thumbnail})`,
    backgroundPosition: `center`,
    backgroundSize: "cover",
  };

  //add tocart
  const handleAddtoCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor Cannot buy courses");
      return;
    }
    if (token) {
      dispatch(addToCart(courseData?.data?.courseDetails));
      if (cart.some((courses) => courses._id === course_id)) {
        setCourseinCart(true);
      }

      // console.log("cart button", courseData?.data?.courseDetails);

      return;
    }

    setConfirmationModal({
      text1: "You are not logged in",
      text2: "please Login to continue",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // console.log("course content ",courseContent);

  return (
    <div className="flex flex-col text-white relative">
      <Helmet><title>{courseData?.data?.courseDetails?.courseName}</title></Helmet>
      <div
        style={containerStyle}
        className=" bg-no-repeat object-contain course-bg p-10 min-h-[450px] flex items-center"
      >
        <div className="lg:w-9/12  justify-center flex flex-col mx-auto gap-5">
          <p className="text-3xl lg:text-5xl font-semibold lg:w-[50%] ">
            <HighLightText text={courseName} />
          </p>

          <p className="text-lg text-richblack-400 lg:w-[60%]">
            {courseDescription}
          </p>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xl">{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span>{`(${ratingAndReviews?.length} Reviews)`}</span>
            <span className="text-richblack-300">{`${studentsEnroled?.length} students`}</span>
          </div>
          <div>
            <p className="text-richblack-100">
              Created by {`${instructor.firstName} ${instructor.lastName}`}
            </p>
          </div>
          <div className="flex gap-2 items-center text-xl">
            <AiFillExclamationCircle />
            <p>
              Created At{" "}
              <span className="text-richblack-25 font-semibold">
                {" "}
                {formattedDate(createdAt)}
              </span>
            </p>
            <p>|</p>
            <BsGlobe />
            <p>English</p>
          </div>
        </div>
      </div>

      {/* card */}

      <div className="lg:absolute rounded-lg right-[10%] top-[5%] bg-richblack-800 bg-opacity-30 backdrop-blur-lg  lg:bg-richblack-700 lg:w-[400px] flex lg:items-start items-center flex-col gap-4 p-10">
        <img src={thumbnail} alt="" className="w-[350px] rounded-lg" />
        <p className="text-4xl font-semibold ">Rs. {price}/-</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={
              studentsEnroled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : () => handleBuyCourse()
            }
            className="bg-yellow-25 hover:shadow-lg hover:shadow-yellow-25 hover:scale-95 transition-all ease-in-out duration-200 text-black   min-w-[240px] md:min-w-[300px] w-full px-4 rounded-lg border-black py-2 font-semibold text-lg"
          >
            {user && studentsEnroled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>
          {user && !studentsEnroled.includes(user?._id) && (
            <button
              onClick={() => handleAddtoCart()}
              className="bg-richblack-800 px-4 text-white w-full rounded-lg border-black py-2 font-semibold text-lg"
            >
              Add to Cart
            </button>
          )}
        </div>
        <p className="lg:text-center">30 days money back gurantee</p>
        <div className="flex flex-col gap-2 ">
          <p className="text-2xl ">This Course Requires</p>
          <p className="flex gap-1 ">
            {" "}
            <span className="text-richblack-100">
              {instructions.map((inst ,index) => {
                return (
                  <div key={index} className="flex ">
                    <span>
                      <BiSolidRightArrow className="text-caribbeangreen-300" />
                    </span>
                    {inst}
                  </div>
                );
              })}
            </span>
          </p>
          <p
            className="text-yellow-5 group cursor-pointer justify-center flex items-center"
            onClick={handleCopy}
          >
            <span className="flex gap-1  items-center">
              <FaShareSquare className="group-hover:translate-x-[69px] transition-all ease-in-out duration-150" />{" "}
              Share
            </span>
          </p>
        </div>
      </div>

      <div className="w-11/12 lg:w-9/12 mx-auto mt-[60px]">
        <div className="flex border-[1px] border-richblack-400  p-5 py-9  w-fit flex-col gap-5 ">
          <p className=" text-xl lg:text-4xl">what You Will Learn ?</p>
          <p>{whatYouWillLearn}</p>
        </div>
      </div>

      <div className="w-11/12 lg:w-9/12 mx-auto mt-[60px] flex gap-4 flex-col">
        <div>
          <p className="text-5xl">Course Content</p>
        </div>
        <div className="flex items-center justify-between w-[70%]">
          <div className="flex flex-wrap gap-3">
            <span>{courseContent.length} section(s) </span>
            <span> {totalLectures} Lecture(s)</span>
            <span>{courseData.data?.totalDuration} total length</span>
          </div>
        </div>

        {/* //sections///.. */}
        <div className="border-[1px] border-richblack-300 lg:w-[70%]">
          {courseContent?.map((section, index) => (
            <details
              key={index}
              className=" transition-all ease-in-out duration-500 "
            >
              <summary
                onClick={() => toggleSection(index)}
                className="h-14 flex pl-8 items-center w-full bg-richblack-600 border-b-[1px] bg-opacity-50 backdrop-blur-lg border-richblack-500"
              >
                <div className="flex justify-between w-full  items-center gap-1">
                  <div className="flex items-center gap-1">
                  <span>
                    <RiArrowDropDownLine
                      className={`text-3xl ${
                        openSectionIndexes.includes(index) ? "" : "rotate-180"
                      } transition-all ease-in-out duration-500`}
                    />
                  </span>
                  {section.sectionName}
                  </div> 
                  <p className="text-yellow-25 mr-5">{section?.subSection?.length} Lecture(s)</p>
                </div>
              </summary>

              <div>
                {openSectionIndexes.includes(index) &&
                  section.subSection?.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex gap-2 pl-10 items-center h-[60px]  "
                    >
                      <AiFillVideoCamera />
                      <span> {sub.title}</span>
                    </div>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="w-9/12 mx-auto mt-[70px] flex flex-col gap-5 mb-[100px]">
        <p className="text-4xl">Author</p>
        <div className="flex items-center gap-5">
          <img
            src={instructor?.image}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="text-2xl">
            {instructor?.firstName} {instructor?.lastName}
          </div>
        </div>
        <p className="text-richblack-200">
          {instructor.additionalDetails.about}
        </p>
      </div>

      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}

      <Footer />
    </div>
  );
};

export default CourseDetails;
