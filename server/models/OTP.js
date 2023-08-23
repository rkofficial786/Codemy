const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate =require("../mails/templates/emailVerificationTemplate")

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60*5,
  },
});

//a function to send email

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("error while sending mail", error);
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
