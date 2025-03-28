import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    // 在这里添加登录 API 调用逻辑
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
