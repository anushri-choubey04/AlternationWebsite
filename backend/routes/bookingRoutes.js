import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* ✅ POST /api/book */
router.post("/book", async (req, res) => {
  try {
    const { name, phone, service, address } = req.body;

    /* Validation */
    if (!name || !phone || !service || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    const booking = new Booking({
      name,
      phone,
      service,
      address,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful 🎉",
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;