import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    console.log("API 地址:", process.env.REACT_APP_API); // 🧪关键！

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/register`, formData);
      console.log("注册成功，响应结果：", res.data); // ✅ 成功回调
      alert("✅ 注册成功，请登录！");
      window.location.href = "/login";
    } catch (err) {
      console.error("注册失败:", err); // ❌ 失败回调
      alert("注册失败：" + (err.response?.data?.message || err.message));
    }
  };


  return (
    <div>
      <h2>注册</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">注册</button>
      </form>
    </div>
  );
}
