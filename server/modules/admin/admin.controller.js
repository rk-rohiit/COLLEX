import {
  getDashboardStatsService,
  getRecentOrdersService,
  getTopCategoriesService,
  getAllUsersService,
  deleteUserService,
  getAllOrdersService,
  updateOrderStatusAdminService,
  getAllListingsAdminService,
  updateUserAdminService,
  updateListingAdminService,
  deleteListingAdminService,
} from "./admin.service.js";

/* =========================
   DASHBOARD
========================= */
export const getDashboardStats = async (req, res, next) => {
  try {
    const data = await getDashboardStatsService(req.user);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getRecentOrders = async (req, res, next) => {
  try {
    const data = await getRecentOrdersService(req.user);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getTopCategories = async (req, res, next) => {
  try {
    const data = await getTopCategoriesService(req.user);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

/* =========================
   USERS
========================= */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService(req.user);
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const updateUserAdmin = async (req, res, next) => {
  try {
    const updated = await updateUserAdminService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await deleteUserService(req.params.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    next(err);
  }
};

/* =========================
   ORDERS
========================= */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService(req.user);
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatusAdmin = async (req, res, next) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG

    const { status } = req.body || {};

    if (!status) {
      throw new Error("Status is required");
    }

    const updated = await updateOrderStatusAdminService(
      req.params.id,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   LISTINGS
========================= */
export const getAllListingsAdmin = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, status } = req.query;

    page = Number(page);
    limit = Number(limit);

    const data = await getAllListingsAdminService(
      req.user,
      page,
      limit,
      status
    );

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateListingAdmin = async (req, res, next) => {
  try {
    const updated = await updateListingAdminService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteListingAdmin = async (req, res, next) => {
  try {
    const result = await deleteListingAdminService(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};