// src/middlewares/role.middleware.js

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      return next(error);
    }

    if (!roles.includes(req.user.role)) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      return next(error);
    }

    next();
  };
};