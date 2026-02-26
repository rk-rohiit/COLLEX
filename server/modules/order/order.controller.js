// src/modules/order/order.controller.js

import {
  createOrderService,
  getMyOrdersService,
  getReceivedOrdersService,
  updateOrderStatusService,
} from "./order.service.js";

/* =========================
   Create Order
========================= */
export const createOrder = async (req, res, next) => {
  try {
    const { listingId, meetType } = req.body;

    const order = await createOrderService(
      listingId,
      req.user,
      meetType || "campus"
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Get My Orders
========================= */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await getMyOrdersService(req.user._id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Get Received Orders
========================= */
export const getReceivedOrders = async (req, res, next) => {
  try {
    const orders = await getReceivedOrdersService(req.user._id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Update Order Status
========================= */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updated = await updateOrderStatusService(
      req.params.id,
      req.user,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};