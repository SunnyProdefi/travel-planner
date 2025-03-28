import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../client/src/pages/Register";
import Login from "../client/src/pages/Login";
import Dashboard from "../client/src/pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
