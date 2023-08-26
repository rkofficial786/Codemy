import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import Formateprice from "../../../common/Formateprice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap 2xl:flex-nowrap items-center md:items-start justify-center md:justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <Link to={`/courses/${course._id}`}>
            <div className="flex flex-1 items-center justify-center md:justify-start md:items-start  min-w-[300px] flex-col   gap-4 xl:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-[200px] rounded-lg object-cover"
              />
              <div className="flex flex-col items-center md:max-w-[60%] lg:items-start ">
                <p className="text-lg font-medium text-richblack-5 md:w-[80%]">
                  {course?.courseName}
                </p>
                <p className="text-sm text-center lg:text-left text-richblack-300">
                  {course?.category?.name}
                </p>
                <div className="flex  md:w-[250px] items-center gap-2 ">
                  <span className="text-yellow-5">
                    {/* Calculate average rating */}
                    {course?.ratingAndReviews?.length > 0
                      ? (
                          course?.ratingAndReviews?.reduce(
                            (acc, curr) => acc + curr.rating,
                            0
                          ) / course?.ratingAndReviews?.length
                        ).toFixed(1)
                      : "No Ratings"}
                  </span>
                  <ReactStars
                count={5}
                value={
                  course?.ratingAndReviews?.length > 0
                    ? course?.ratingAndReviews?.reduce(
                        (acc, curr) => acc + curr.rating,
                        0
                      ) / course?.ratingAndReviews?.length
                    : 0
                }
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
                  <span className="text-richblack-400">
                    {course?.ratingAndReviews?.length} Ratings
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex gap-5 justify-start items-center md:gap-0 flex-row md:flex-col md:items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              <Formateprice price={course.price} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
