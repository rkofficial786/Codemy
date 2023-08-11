import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"

import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error";
import Footer from "./../components/common/Footer";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";

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

  console.log("catalog",catalogPageData);
  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
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

      <div>
        <div>COurse to get you satrted</div>
        <div>
          <p>Most Popular</p>
          <p>New</p>
        </div>
        <div>
          <CourseSlider
            courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
        <div>
          {" "}
          <CourseSlider
            courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div>
    <div className="font-bold text-xl mb-4">Frequently Bought</div>
    <div className="py-8 grid  justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">
            {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                <CourseCard course={course} key={index} Height={"h-[400px]"} />
            ))}
        </div>
    </div>
</div>


      <Footer />
    </>
  );
}

export default Catalog;
