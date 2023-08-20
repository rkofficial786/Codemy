import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use setTimeout to allow the scroll transition CSS to take effect
    const scrollToTopWithTimeout = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Adjust the delay as needed
    };

    scrollToTopWithTimeout();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
