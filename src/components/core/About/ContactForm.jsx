import React from "react";
import ContactUsForm from "../Contact/ContactUsForm";
import HighLightText from "../HomePage/HighLightText";

const ContactForm = () => {
  return (
    <div className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] md:mx-0 flex   gap-8 flex-col">
      <h1 className="text-3xl"><HighLightText text={"Get in touch "}/></h1>
      <p>We do love to hear from you. Please fill out this form</p>

      <ContactUsForm />
    </div>
  );
};

export default ContactForm;
