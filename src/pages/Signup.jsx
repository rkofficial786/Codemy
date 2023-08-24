import React from 'react';
import signupImg from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";
import HighLightText from "../components/core/HomePage/HighLightText";
import { Helmet } from 'react-helmet';

function Signup() {
  return (
    <> <Helmet > <title>Signup</title></Helmet>
    <Template
      title={
        <>
          Join the millions learning to code with{' '}
          <HighLightText text="Codemy" />
          for free
        </>
      }
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
    </>
  );
}

export default Signup;
