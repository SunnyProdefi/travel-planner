import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/TripForm.css";

export default function TripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    status: "planning",
    itinerary: [""]
  });

  useEffect(() => {
    if (id) {
      fetchTrip();
    }
  }, [id]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips/${id}`);
      const trip = response.data;
      setFormData({
        title: trip.title || "",
        destination: trip.destination || "",
        startDate: trip.startDate ? trip.startDate.split("T")[0] : "",
        endDate: trip.endDate ? trip.endDate.split("T")[0] : "",
        budget: trip.budget || "",
        description: trip.description || "",
        status: trip.status || "planning",
        itinerary: trip.itinerary || [""]
      });
    } catch (err) {
      setError("获取旅行计划失败");
      console.error("获取旅行计划失败:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItineraryChange = (index, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = value;
    setFormData(prev => ({
      ...prev,
      itinerary: newItinerary
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, ""]
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        ...formData,
        itinerary: formData.itinerary.filter(day => day.trim() !== "")
      };

      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, data);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, data);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(id ? "更新旅行计划失败" : "创建旅行计划失败");
      console.error(id ? "更新旅行计划失败:" : "创建旅行计划失败:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="trip-form-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-form-container">
      <div className="form-header">
        <h1>{id ? "编辑旅行计划" : "创建新的旅行计划"}</h1>
        <p>填写以下信息来{id ? "更新" : "创建"}你的旅行计划</p>
      </div>

      {error && (
        <div className="error-message">
          <i className="error-icon">⚠️</i>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label htmlFor="title">标题</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="给你的旅行起个名字"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="destination">目的地</label>
          <input
            id="destination"
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="你想去哪里"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">开始日期</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">结束日期</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="budget">预算</label>
          <input
            id="budget"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="预计花费"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">描述</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="描述一下你的旅行计划"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">状态</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="planning">计划中</option>
            <option value="ongoing">进行中</option>
            <option value="completed">已完成</option>
          </select>
        </div>

        <div className="form-group">
          <label>行程安排</label>
          <div className="itinerary-list">
            {formData.itinerary.map((day, index) => (
              <div key={index} className="itinerary-day">
                <div className="day-header">
                  <span className="day-number">第 {index + 1} 天</span>
                  {formData.itinerary.length > 1 && (
                    <button
                      type="button"
                      className="remove-day"
                      onClick={() => removeItineraryDay(index)}
                    >
                      删除
                    </button>
                  )}
                </div>
                <textarea
                  value={day}
                  onChange={(e) => handleItineraryChange(index, e.target.value)}
                  placeholder={`第 ${index + 1} 天的行程安排`}
                  rows="3"
                />
              </div>
            ))}
            <button
              type="button"
              className="add-day"
              onClick={addItineraryDay}
            >
              添加行程
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            取消
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "保存中..." : (id ? "更新" : "创建")}
          </button>
        </div>
      </form>
    </div>
  );
} 