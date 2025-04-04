import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('请先登录');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        console.error('获取旅行计划失败:', err);
        setError(err.response?.data?.message || '获取旅行计划失败，请稍后重试');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在加载旅行计划...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-secondary">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="trip-list">
      <div className="trip-list-header">
        <h2>我的旅行计划</h2>
        <Link to="/trips/new" className="btn btn-primary">创建新计划</Link>
      </div>
      {trips.length === 0 ? (
        <div className="no-trips">
          <p>你还没有创建任何旅行计划</p>
          <Link to="/trips/new" className="btn btn-primary">创建第一个计划</Link>
        </div>
      ) : (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip._id} className="trip-card">
              <h3>{trip.title}</h3>
              <p>目的地: {trip.destination}</p>
              <p>日期: {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
              <Link to={`/trips/${trip._id}`} className="btn btn-secondary">查看详情</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList; 