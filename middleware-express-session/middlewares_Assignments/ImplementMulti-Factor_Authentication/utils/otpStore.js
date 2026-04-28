const otpDB = {};

// generate & store OTP
exports.setOTP = (userId, otp) => {
  otpDB[userId] = otp;

  // expire after 5 min
  setTimeout(() => {
    delete otpDB[userId];
  }, 5 * 60 * 1000);
};

// get OTP
exports.getOTP = (userId) => {
  return otpDB[userId];
};