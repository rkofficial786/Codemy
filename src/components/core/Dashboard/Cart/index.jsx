import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RendereTotalAmount from "./RendereTotalAmount";
import { useEffect } from "react";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

 
 
  return (
    <div>
      <h1>Your Cart</h1>
      <p>{totalItems} Courses in cart</p>

      {total > 0 ? (
        <div>
          {" "}
          <RenderCartCourses />
          <RendereTotalAmount />
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
