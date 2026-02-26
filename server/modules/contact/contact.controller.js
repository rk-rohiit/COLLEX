// src/modules/contact/contact.controller.js

import Contact from "../../models/contact.model.js";

/* =========================
   Submit Contact Message (Public)
========================= */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      throw new Error("All fields are required");
    }

    const newMessage = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Admin: Get All Messages
========================= */
export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Admin: Delete Message
========================= */
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      throw new Error("Message not found");
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};