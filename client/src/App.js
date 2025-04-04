import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TripForm from "./pages/TripForm";
import TripDetail from "./pages/TripDetail";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips/new" element={<TripForm />} />
          <Route path="/trips/:id/edit" element={<TripForm />} />
          <Route path="/trips/:id" element={<TripDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

