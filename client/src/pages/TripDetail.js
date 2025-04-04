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
        <div className="loading-spinner">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-detail-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="trip-detail-container">
        <div className="error-message">未找到旅行计划</div>
      </div>
    );
  }

  return (
    <div className="trip-detail-container">
      <div className="trip-header">
        <div className="trip-title">
          <h1>{trip.title}</h1>
          <span className={`trip-status ${trip.status}`}>
            {trip.status === "planning" ? "计划中" : trip.status === "ongoing" ? "进行中" : "已完成"}
          </span>
        </div>
        <div className="trip-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/trips/${id}/edit`)}
          >
            编辑
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            删除
          </button>
        </div>
      </div>

      <div className="trip-content">
        <div className="trip-info">
          <div className="info-card">
            <h3>目的地</h3>
            <p>{trip.destination}</p>
          </div>
          <div className="info-card">
            <h3>开始日期</h3>
            <p>{new Date(trip.startDate).toLocaleDateString()}</p>
          </div>
          <div className="info-card">
            <h3>结束日期</h3>
            <p>{new Date(trip.endDate).toLocaleDateString()}</p>
          </div>
          <div className="info-card">
            <h3>预算</h3>
            <p>¥{trip.budget}</p>
          </div>
        </div>

        <div className="trip-description">
          <h3>行程描述</h3>
          <p>{trip.description}</p>
        </div>

        <div className="trip-itinerary">
          <h3>行程安排</h3>
          {trip.itinerary && trip.itinerary.length > 0 ? (
            <div className="itinerary-list">
              {trip.itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <h4>第 {index + 1} 天</h4>
                  <p>{day}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-itinerary">暂无行程安排</p>
          )}
        </div>
      </div>
    </div>
  );
} 