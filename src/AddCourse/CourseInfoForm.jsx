import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../services/operations/CourseAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
// import { categories } from './../../../../services/apis';
import { COURSE_STATUS } from "../../../../utils/constants";

import BtnIcon from "./../../../common/BtnIcon";
import { setCourse } from "../../../../slices/courseSlice";
import { setStep } from "../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import { ImCross } from "react-icons/im";
import {
  addCourseDetails,
  editCourseDetails,
} from "../../../../services/operations/courseDetailsAPI";
const CourseInfoForm = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);
  console.log(courseCategory);

  const getCategories = async () => {
    setLoading(true);

    const category = await fetchCourseCategories();

    if (category.length > 0) {
      setCourseCategory(category);
    }
    setLoading(false);
    console.log("categri", category);
    console.log("courseCategory 1", courseCategory);
  };
  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.coursewhatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  // pending

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }

        if (currentValues.coursePrice !== course.coursePrice) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        setLoading(true);

        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("no changes made ");
      }
      return;
    }
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("formdata", formData);
    console.log("printing result", result);
  };

  // tags sectuion
  const [tagValue, setTagValue] = useState("");
  const [tagsValues, setTagsValues] = useState([]);

  function handletagbutton(e) {
    e.preventDefault();
  
    // Trim the input value to remove leading and trailing spaces
    const trimmedValue = e.target.value.trim();
  
    // Check if the trimmed value is not empty
    if (trimmedValue.length > 0) {
      setTagValue(trimmedValue);
      const containsLetter = /[a-zA-Z]/.test(trimmedValue);
      // Now you can perform the comma-separated tag logic
      if (trimmedValue.includes(",") && tagValue.trim()!=="" && containsLetter) {
        setTagsValues([...tagsValues, trimmedValue.split(",")[0]]);
        setTagValue("");
      }
    }
  }
  const removeTag = (indexToRemove) => {
    const updatedTags = tagsValues.filter(
      (_, index) => index !== indexToRemove
    );
    setTagsValues(updatedTags);
  };

  // register for tags

  useEffect(() => {
    register("courseTags", { required: true });
  }, []);

  useEffect(() => {
    setValue("courseTags", tagsValues);
  }, [tagsValues]);

  // requirements section
  const [requirementValue, setRequirementValue] = useState("");
  const [requirementsValues, setRequirementsValues] = useState([]);

  function handleRequirements(e) {
    e.preventDefault();
    setRequirementsValues([...requirementsValues, requirementValue]);
    setRequirementValue("");
  }

  const removeRequirements = (indexToRemove) => {
    const updatedRequirements = requirementsValues.filter(
      (_, index) => index !== indexToRemove
    );
    setRequirementsValues(updatedRequirements);
  };

  // register for Requirements

  useEffect(() => {
    register("courseRequirements", { required: true });
  }, []);

  useEffect(() => {
    setValue("courseRequirements", requirementsValues);
  }, [requirementsValues]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[550px] md:mx-0"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none  focus:ring-2 focus:ring-white"
          />
          {errors.courseTitle && (
            <span className="text-pink-500 text-sm">
              Course Title is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="CourseDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            placeholder="Enter Course Description"
            {...register("courseDescription", { required: true })}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.courseDescription && (
            <span className="text-pink-500 text-sm">
              Course Description is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="coursePrice"
            className="block text-sm font-medium text-gray-700"
          >
            Course Price
          </label>
          <div className="relative">
            <input
              type="number"
              id="coursePrice"
              name="coursePrice"
              placeholder="Enter Course Price"
              {...register("coursePrice", { required: true })}
              className="w-full rounded-md bg-richblack-800 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <HiOutlineCurrencyRupee className="absolute top-3 left-3 text-gray-600" />
          </div>
          {errors.coursePrice && (
            <span className="text-pink-500 text-sm">
              Course Price is required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Course Category
          </label>
          <select
            name="courseCategory"
            id="courseCategory"
            defaultValue={""}
            {...register("courseCategory", { required: true })}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategory.map((category, index) => (
                <option value={category?._id} key={index}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="text-pink-500 text-sm">
              Course Category is Required
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {tagsValues.map((tags, index) => (
              <div
                className="bg-yellow-400 flex bg-opacity-40 text-yellow-25 px-1 rounded-full "
                key={index}
                onClick={() => removeTag(index)}
              >
                {tags}
                <span>
                  <ImCross className="text-[6px] text-white cursor-pointer" />
                </span>
              </div>
            ))}
          </div>
          <label
            htmlFor="courseTags"
            className="block text-sm font-medium text-gray-700"
          >
            Course Tags
          </label>
          <input
            type="text"
            id="courseTags"
            name="courseTags"
            value={tagValue}
            onChange={handletagbutton}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.courseTags && (
            <span className="text-pink-500 text-sm">
              Course Tag is Required
            </span>
          )}
        </div>

        <div>{/* Image upload section (not shown in the provided code) */}</div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseBenefits"
            className="block text-sm font-medium text-gray-700"
          >
            Course Benefits
          </label>
          <textarea
            name="courseBenefit"
            id="courseBenefit"
            cols="20"
            rows="7"
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", { required: true })}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
          ></textarea>
          {errors.courseBenefits && (
            <span className="text-pink-500 text-sm">
              Course Benefit is Required
            </span>
          )}
        </div>

        {/* Requirements section */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="courseRequirements"
            className="block text-sm font-medium text-gray-700"
          >
            Course Requirements
          </label>
          <input
            type="text"
            id="courseRequirements"
            name="courseRequirements"
            value={requirementValue}
            onChange={(e) => setRequirementValue(e.target.value)}
            className="w-full rounded-md bg-richblack-800 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleRequirements}
            className="bg-richblack-700 text-white w-fit  px-2 py-1 rounded-md  font-medium "
          >
            Add
          </button>
          {errors.courseRequirements && (
            <span className="text-pink-500 text-sm">
              Course Requirements is Required
            </span>
          )}
          {requirementsValues.map((req, index) => (
            <div key={index} className="text-yellow-50" onClick={() => removeRequirements(index)}>
              {req}{" "}
              <button className="rounded-xl bg-richblack-500 text-white  px-1 py-[]">
                clear
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="bg-yellow-200 px-4 py-2 rounded-md text-richblack-900 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Continue Without Saving
            </button>
          )}

          <BtnIcon
            text={!editCourse ? "Next" : "Save Changes"}
            btnClassName="bg-yellow-200 px-4 py-2 rounded-md text-richblack-900 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInfoForm;
