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
        const response = await axios.get('/api/trips', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        setError('获取旅行计划失败');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="trip-list">
      <h2>我的旅行计划</h2>
      <Link to="/trips/new" className="btn btn-primary">创建新计划</Link>
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
    </div>
  );
};

export default TripList; 