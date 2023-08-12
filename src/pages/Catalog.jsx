import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"

import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error";
import Footer from "./../components/common/Footer";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import HighLightText from "../components/core/HomePage/HighLightText";

function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  // Fetch All Categories
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catalogName.toLowerCase()
        )[0]._id;
        setCategoryId(category_id);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, [catalogName]);
  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  console.log("catalog", catalogPageData);
  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 w-full">
        <div className=" flex w-9/12 mx-auto min-h-[260px]  flex-col justify-center gap-4  ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}

      <div className="w-9/12 mx-auto flex flex-col mt-[40px] gap-5">
        <div className="text-4xl font-semibold"><HighLightText text={"Courses to get You Started"}/></div>
        <div className="flex items-center gap-5 tabCourse">
         <NavLink to={`/catalog/${catalogName}`} > <p>Most Popular</p></NavLink>
         <NavLink  to={`/`}> <p>New</p></NavLink>
          
        </div>

        <div className="w-9/12 bg-richblack-400 h-[1px] -mt-3 "></div>
        <div className="">
          <CourseSlider
            courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-9/12 mx-auto mt-[40px] flex flex-col gap-6">
        <p className="text-4xl font-semibold"><HighLightText text={"Top Courses in"}/> <span className="text-yellow-25">{catalogPageData?.data?.differentCategory?.name}</span> </p>
        <div>
          {" "}
          <CourseSlider
            courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-9/12 mx-auto flex flex-col gap-6 mt-[40px]">
      <div className="w-9/12 bg-richblack-400 h-[1px] -mt-3 "></div>
        <div className="text-4xl font-semibold"><HighLightText text={"Frequently Bought"}/></div>
        <div className="py-8 grid items-center justify-center ">
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-around">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 8)
              .map((course, index) => (
                <CourseCard course={course} key={index} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;
