import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TripDetail.css";

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips/${id}`);
        setTrip(response.data);
      } catch (err) {
        setError("获取旅行计划详情失败");
        console.error("获取旅行计划详情失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("确定要删除这个旅行计划吗？")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/trips/${id}`);
        navigate("/dashboard");
      } catch (err) {
        setError("删除旅行计划失败");
        console.error("删除旅行计划失败:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="trip-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-detail-container">
        <div className="error-message">
          <i className="error-icon">⚠️</i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="trip-detail-container">
        <div className="error-message">
          <i className="error-icon">❌</i>
          <p>未找到旅行计划</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-detail-container">
      <div className="trip-header">
        <div className="trip-header-content">
          <div className="trip-title">
            <h1>{trip.title}</h1>
            <span className={`trip-status ${trip.status}`}>
              {trip.status === "planning" ? "计划中" : trip.status === "ongoing" ? "进行中" : "已完成"}
            </span>
          </div>
          <div className="trip-meta">
            <span className="trip-destination">
              <i className="icon">📍</i>
              {trip.destination}
            </span>
            <span className="trip-dates">
              <i className="icon">📅</i>
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="trip-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/trips/${id}/edit`)}
          >
            <i className="icon">✏️</i>
            编辑
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <i className="icon">🗑️</i>
            删除
          </button>
        </div>
      </div>

      <div className="trip-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          概览
        </button>
        <button
          className={`tab-btn ${activeTab === "itinerary" ? "active" : ""}`}
          onClick={() => setActiveTab("itinerary")}
        >
          行程安排
        </button>
        <button
          className={`tab-btn ${activeTab === "expenses" ? "active" : ""}`}
          onClick={() => setActiveTab("expenses")}
        >
          预算
        </button>
      </div>

      <div className="trip-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="trip-description">
              <h3>行程描述</h3>
              <p>{trip.description}</p>
            </div>
            <div className="trip-stats">
              <div className="stat-card">
                <i className="icon">💰</i>
                <h4>预算</h4>
                <p className="stat-value">¥{trip.budget}</p>
              </div>
              <div className="stat-card">
                <i className="icon">⏱️</i>
                <h4>行程天数</h4>
                <p className="stat-value">
                  {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} 天
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div className="itinerary-section">
            {trip.itinerary && trip.itinerary.length > 0 ? (
              <div className="itinerary-list">
                {trip.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-day">
                    <div className="day-header">
                      <span className="day-number">第 {index + 1} 天</span>
                      <span className="day-date">
                        {new Date(new Date(trip.startDate).getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="day-content">
                      <p>{day}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-itinerary">
                <i className="icon">📝</i>
                <p>暂无行程安排</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="expenses-section">
            <div className="budget-overview">
              <h3>预算概览</h3>
              <div className="budget-progress">
                <div className="progress-bar">
                  <div className="progress" style={{ width: "60%" }}></div>
                </div>
                <div className="budget-stats">
                  <span>已使用: ¥{Math.floor(trip.budget * 0.6)}</span>
                  <span>剩余: ¥{Math.floor(trip.budget * 0.4)}</span>
                </div>
              </div>
            </div>
            <div className="expense-categories">
              <h3>支出分类</h3>
              <div className="category-list">
                <div className="category-item">
                  <span className="category-name">交通</span>
                  <span className="category-amount">¥{Math.floor(trip.budget * 0.3)}</span>
                </div>
                <div className="category-item">
                  <span className="category-name">住宿</span>
                  <span className="category-amount">¥{Math.floor(trip.budget * 0.4)}</span>
                </div>
                <div className="category-item">
                  <span className="category-name">餐饮</span>
                  <span className="category-amount">¥{Math.floor(trip.budget * 0.2)}</span>
                </div>
                <div className="category-item">
                  <span className="category-name">其他</span>
                  <span className="category-amount">¥{Math.floor(trip.budget * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 