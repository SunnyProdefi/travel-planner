const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: false }));
app.use(express.json());

// 路由
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// 默认根路径响应（用于调试）
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
