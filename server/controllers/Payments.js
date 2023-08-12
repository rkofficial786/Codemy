const { instance } = require("../config/razorpay");
import Stats from "./../../src/components/core/About/Stats";
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mails/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

exports.capturePayments = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide course Id" });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the course" });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }
      totalAmount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }


  const options  ={
    amount:totalAmount*100 ,
    currency:"INR",
    receipt:Math.random(Date.now()).toString()
  }

 try {
  const paymentResponse=await instance.orders.create(options)
  res.json({
    success:true ,
    message:paymentResponse
  })
 } catch (error) {
  console.log(error);
  return res.status(500).json({success:false,message:"could not complete payment"})
 }

};

//verify the payemnet

exports.verifyPayment =async(req,res)=>{
  const razorpay_order_id =req.body?.razorpay_order_id ;
  const razorpay_payment_id =req.body?.razorpay_payment_id  ;
  const razorpay_signature =req.body?.razorpay_signature ;
  const courses =req.body?.courses ;
  const userId =req.user.id 


  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||!courses || !userId){
    return res.status({
      success:false ,
      message:"Payment failed"
    })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id 
  const expectedSignature =crypto.createHmac



}

// exports.capturePayment = async (req, res) => {
//   const { course_id } = req.body;
//   const userId = req.user.id;

//   if (!course_id) {
//     return res.status(401).json({
//       success: false,
//       message: "Please Provide valid course Id",
//     });
//   }

//   try {
//     var course = await Course.findById(course_id);
//     if (!course) {
//       return res.json({
//         success: false,
//         message: "Could not find course",
//       });
//     }
//     const uid = new mongoose.Types.ObjectId(userId);

//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "Studnet is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   //order create
//   const amount = course.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString,
//     notes: {
//       coursId: course_id,
//       userId,
//     },
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };

// //verify signature

// exports.verifySignature = async (req, res) => {
//   const webhookSecret = "1234565";

//   const signature = req.headers["x-razorpay-signature"];

//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment is authorized");
//     const { coursId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       //fullfill the action

//       //enroll the student
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: coursId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );
//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course Not Found",
//         });
//       }

//       console.log(enrolledCourse);

//       const enrolledStudent = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: { courses: coursId },
//         },
//         { new: true }
//       );

//       console.log(enrolledStudent);

//       //mail send

//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulation for the new course",
//         "Congratulation for the new course of web devv by bye"
//       );
//       console.log(emailResponse);

//       return res.status(200).json({
//         success: true,
//         message: "Course buy succceess",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "Signature does not match",
//     });
//   }
// };
