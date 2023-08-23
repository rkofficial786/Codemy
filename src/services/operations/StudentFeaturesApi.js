import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

import rzlogo from "../../assets/Logo/full.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { SEND_PAYMENT_SUCCESS_EMAIL_API, COURSE_PAYMENT_API,COURSE_VERIFY_API } = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("loading...");

  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return
    }

    //initiate the order

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    //options

    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "EduFlex",
      description: "Thank You For Purchasing Course",
      image: rzlogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: `${userDetails.email}`,
      },
      handler: function (response) {
        ///send succesffuull email
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
//misis hogya tha guys
    const paymentObject=new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed",function(response){
        toast.error("Opps ,payment failed");
        console.log(response.error);

    })
    
  } catch (error) {
    console.log("Payment api error....", error);
    toast.error("Could not make payement");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.log("Payment email error", error);
  }
}


//verify payement
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId=toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))

    try {
        const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{Authorization:`Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Payment Success, You have enrolled in the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("Payment Veify error",error);
        toast.error("could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}
