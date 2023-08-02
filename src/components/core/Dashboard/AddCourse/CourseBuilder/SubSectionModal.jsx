import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";

import BtnIcon from "./../../../../common/BtnIcon";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [laoding, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    setLoading(true);
    //api call
    const result = await updateSubSection(formData, token);
    if (result) {
      //todo updation
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        //edit krdo
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      //todo cehek validation
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lectures
          </p>
          <button onClick={() => (!laoding ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {/* <Upload
            name="lectureVideo"
            label="Lecture Video "
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          /> */}
          <div>
            <label htmlFor="lectureTitle">Title</label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && <span>Lecture Title is required</span>}
          </div>
          <div>
            <label htmlFor="lectureDesc">Description</label>
            <textarea
              name="lectureDesc"
              id="lectureDesc"
              cols="30"
              rows="10"
              {...register("lectureDesc", { required: true })}
            ></textarea>
            {errors.lectureDesc && (
              <span>Lecture Description is required </span>
            )}
          </div>
          {!view && (
            <div>
              <BtnIcon text={edit ? "Save Changes" : "Save"} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
