const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ 推荐：只允许你 Cloudflare 前端访问后端
const allowedOrigins = [
  "https://travel-planner-37o.pages.dev", // 👈 根据你实际的前端地址修改
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 如果请求来源在白名单里，或是开发环境请求（Postman/null），就允许
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ 路由引入
const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

// ✅ 默认根路径调试
app.get("/", (req, res) => {
  res.send("API running");
});

// ✅ 错误处理（例如未匹配任何路由）
app.use((req, res) => {
  res.status(404).json({ message: "接口不存在" });
});

// ✅ 启动数据库 & 服务器
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
