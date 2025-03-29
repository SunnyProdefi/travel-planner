const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 注册
// 注册
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查是否已注册
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "邮箱已注册" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    res.json({ message: "注册成功" });
  } catch (err) {
    console.error("注册失败:", err);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
});

// 登录
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "用户不存在" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "密码错误" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;
