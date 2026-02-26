// src/modules/auth/auth.validation.js

export const validateRegisterInput = (data) => {
  const { email, fullName, phone, course, year, password } = data;

  if (!email || !fullName || !phone || !course || !year || !password) {
    throw new Error("All required fields must be provided");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
};

export const validateLoginInput = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};