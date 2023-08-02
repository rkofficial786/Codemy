import { useState } from "react"
import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"
import HighLightText from "../components/core/HomePage/HighLightText"
import Loader from "../components/common/Loader"


function Login() {

  const [loading ,setLoading] =useState(true)
  return (
    <div>
      
    <Template
    title={
      <>
        
        <HighLightText text="Welcome" /> Back
       
      </>
    }
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    /></div>
  )
}

export default Login