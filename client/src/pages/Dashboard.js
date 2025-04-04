import React from "react";
import { Link } from "react-router-dom";
import TripList from "../components/TripList";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>我的旅行计划</h1>
        <Link to="/trips/new" className="btn btn-primary">
          创建新计划
        </Link>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>总计划数</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>进行中</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <h3>已完成</h3>
            <p className="stat-number">0</p>
          </div>
        </div>

        <div className="trip-list-container">
          <h2>最近的旅行计划</h2>
          <TripList />
        </div>
      </div>
    </div>
  );
}
