import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/core/HomePage/Button";

const Error = () => {
  return (
    <div className="flex w-11/12 mx-auto max-w-maxContent flex-col items-center justify-center h-[80vh] text-white gap-6">
      <p className="text-4xl text-pink-200 font-bold">Error 404: Page Not Found</p>

      <p className="text-lg text-gray-300 mt-4">
        Oops! The page you're looking for does not exist.
      </p>

      <p className="text-gray-400">
        It seems like the URL you entered is incorrect or the page has been removed.
      </p>

      <Button linkto={"/"} active={true} className="mt-8">
        Go to Home
      </Button>
    </div>
  );
};

export default Error;
