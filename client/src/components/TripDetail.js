import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('请先登录');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrip(response.data);
        setLoading(false);
      } catch (err) {
        console.error('获取旅行计划详情失败:', err);
        setError(err.response?.data?.message || '获取旅行计划详情失败');
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在加载旅行计划详情...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/dashboard" className="btn btn-secondary">返回仪表盘</Link>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="error-container">
        <p className="error-message">旅行计划不存在</p>
        <Link to="/dashboard" className="btn btn-secondary">返回仪表盘</Link>
      </div>
    );
  }

  return (
    <div className="trip-detail">
      <div className="trip-header">
        <h1>{trip.title}</h1>
        <div className="trip-actions">
          <Link to={`/trips/${id}/edit`} className="btn btn-primary">编辑</Link>
        </div>
      </div>

      <div className="trip-info">
        <div className="info-section">
          <h2>基本信息</h2>
          <p><strong>目的地：</strong>{trip.destination}</p>
          <p><strong>开始日期：</strong>{new Date(trip.startDate).toLocaleDateString()}</p>
          <p><strong>结束日期：</strong>{new Date(trip.endDate).toLocaleDateString()}</p>
          <p><strong>预算：</strong>{trip.budget ? `¥${trip.budget}` : '未设置'}</p>
        </div>

        {trip.description && (
          <div className="info-section">
            <h2>描述</h2>
            <p>{trip.description}</p>
          </div>
        )}

        {trip.activities && trip.activities.length > 0 && (
          <div className="info-section">
            <h2>活动安排</h2>
            <div className="activities-list">
              {trip.activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <h3>{activity.title}</h3>
                  <p><strong>日期：</strong>{new Date(activity.date).toLocaleDateString()}</p>
                  {activity.location && <p><strong>地点：</strong>{activity.location}</p>}
                  {activity.notes && <p><strong>备注：</strong>{activity.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="trip-footer">
        <Link to="/dashboard" className="btn btn-secondary">返回仪表盘</Link>
      </div>
    </div>
  );
};

export default TripDetail; 