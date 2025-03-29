const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ 修复 CORS 跨域问题
app.use(cors({
  origin: "*", // ← 临时放开，确认是否是前端访问受限
  methods: ["GET", "POST"],
  credentials: false
}));

app.use(express.json());

// 路由
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// 端口监听
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log("Server running on port", PORT)))
  .catch((err) => console.error(err));
