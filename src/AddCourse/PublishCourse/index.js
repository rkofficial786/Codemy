import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {};
  return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6">
      <p>Public course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">Make this Course as Public</label>
          <input
          type="checkbox"
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
