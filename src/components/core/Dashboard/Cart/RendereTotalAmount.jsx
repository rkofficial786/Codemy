import React from 'react'
import { useSelector } from 'react-redux'
import BtnIcon from './../../../common/BtnIcon';

const RendereTotalAmount = () => {
  const {total,cart} =useSelector((state)=>state.cart)
  const handleBuyCourse=()=>{
    const courses =cart.map((course)=>course._id)
    console.log("Bought",courses);
  }
  return (
    <div>
      <p>Total:</p>
      <p>Rs{total}</p>
      <BtnIcon  text={"Buy Now"}
      onClick={handleBuyCourse} />
    </div>
  )
}

export default RendereTotalAmount