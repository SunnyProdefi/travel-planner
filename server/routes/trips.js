const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const auth = require("../middleware/auth");

// 获取所有旅行计划
router.get("/", auth, async (req, res) => {
  try {
    const trips = await Trip.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error("获取旅行计划失败:", err);
    res.status(500).json({ message: "服务器错误" });
  }
});

// 创建新旅行计划
router.post("/", auth, async (req, res) => {
  try {
    const trip = new Trip({
      ...req.body,
      createdBy: req.user.id
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error("创建旅行计划失败:", err);
    res.status(400).json({ message: err.message });
  }
});

// 获取单个旅行计划
router.get("/:id", auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "旅行计划未找到" });
    }
    res.json(trip);
  } catch (err) {
    console.error("获取旅行计划失败:", err);
    res.status(500).json({ message: "服务器错误" });
  }
});

// 更新旅行计划
router.put("/:id", auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) {
      return res.status(404).json({ message: "旅行计划未找到" });
    }
    res.json(trip);
  } catch (err) {
    console.error("更新旅行计划失败:", err);
    res.status(400).json({ message: err.message });
  }
});

// 删除旅行计划
router.delete("/:id", auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "旅行计划未找到" });
    }
    res.json({ message: "旅行计划已删除" });
  } catch (err) {
    console.error("删除旅行计划失败:", err);
    res.status(500).json({ message: "服务器错误" });
  }
});

module.exports = router; 