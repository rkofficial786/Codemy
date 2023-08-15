import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import { useEffect } from "react";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    console.log("Cart",cart);
  },[])
  return (
    <div>
      {cart.map((course, index) => {
        return (
          <div>
            <div>
              <img src={course?.thumbnail} alt="" />
              <div>
                <p>{course.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                  <span>4.8</span>
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
              </div>
            </div>

            <div>
              <button onClick={() => dispatch(removeFromCart(course._id))}>
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>

              <p>Rs {course?.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartCourses;
