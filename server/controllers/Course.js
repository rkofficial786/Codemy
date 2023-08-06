const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create course
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    //check instructor
    const userId = req.user.id;

    const instructorDetails = await User.findById(userId);
    console.log("Instructor details", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // upload image

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course to the user schema of instructor

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went while course creation",
    });
  }
};

//TODO  update Category schema

//get all courses

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};

//getcoursedetails

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.find({ _id: courseId }).populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    }).populate("category").populate("ratingAndReviews").populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec()

 //validation 

 if(!courseDetails){
  return res.status(400).json({
    success:false,
    message:"Could not find the course with this courseID"
  })
 }

 return res.status(200).json({
  success:true,
  message:"Course Details fetched successfully",
  data:courseDetails
 })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false ,
      message:"Something went wrong"
    })
  }
};
