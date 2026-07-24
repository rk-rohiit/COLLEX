export const validateRegisterInput = (data) => {
  const { email, fullName, phone, course, year, password } = data;

  if (!email || !fullName || !phone || !course || !year || !password) {
    throw new Error("All required fields must be provided");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
};

export const validateOtpInput = (data) => {
  const { email, otp } = data;

  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }
};

export const validateLoginInput = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

export const validateForgotPasswordInput = (data) => {
  const { email } = data;

  if (!email) {
    throw new Error("Email is required");
  }
};

export const validateResetPasswordInput = (data) => {
  const { email, otp, newPassword } = data;

  if (!email || !otp || !newPassword) {
    throw new Error("Email, OTP, and new password are required");
  }

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new Error("Password must contain uppercase, lowercase and number");
  }
};