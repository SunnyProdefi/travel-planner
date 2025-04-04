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
    console.log("API 地址:", process.env.REACT_APP_API_URL);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      console.log("✅ 登录成功", res.data);

      // 保存 token
      localStorage.setItem("token", res.data.token);
      alert("✅ 登录成功！");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ 登录失败:", err);
      alert("登录失败：" + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="邮箱"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">登录</button>
      </form>
    </div>
  );
}

