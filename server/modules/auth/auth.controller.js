// src/modules/auth/auth.controller.js

import {
  registerUserService,
  loginUserService,
} from "./auth.service.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "./auth.validation.js";

export const registerUser = async (req, res, next) => {
  try {
    validateRegisterInput(req.body);

    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    validateLoginInput(req.body);

    const result = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};