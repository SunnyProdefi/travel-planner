import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    console.log("API 地址:", process.env.REACT_APP_API); // 可以确认当前 API 是不是对的

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, formData);
      console.log("✅ 登录成功", res.data);

      // 保存 token（可选，或者跳转）
      localStorage.setItem("token", res.data.token);
      alert("✅ 登录成功！");
      window.location.href = "/dashboard"; // 可跳转其他页面
    } catch (err) {
      console.error("❌ 登录失败:", err);
      alert("登录失败：" + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="邮箱" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="密码" value={formData.password} onChange={handleChange} required />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

