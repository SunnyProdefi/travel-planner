import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", form);
    alert("注册成功！");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input placeholder="用户名" onChange={e => setForm({ ...form, username: e.target.value })} /><br/>
      <input placeholder="密码" type="password" onChange={e => setForm({ ...form, password: e.target.value })} /><br/>
      <button type="submit">注册</button>
    </form>
  );
}