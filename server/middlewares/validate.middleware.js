// src/middlewares/validate.middleware.js

export const validate = (validationFn) => {
  return (req, res, next) => {
    try {
      validationFn(req.body);
      next();
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  };
};