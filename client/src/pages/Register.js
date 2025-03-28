import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
    // 你可以在这里发起 POST 请求到你的后端 API
  };

  return (
    <div>
      <h2>注册</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="用户名" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="邮箱" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="密码" value={formData.password} onChange={handleChange} required />
        <button type="submit">注册</button>
      </form>
    </div>
  );
}
