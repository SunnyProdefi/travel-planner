import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TripForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    destination: '',
    budget: '',
    activities: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchTrip = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const trip = response.data;
          setFormData({
            ...trip,
            startDate: new Date(trip.startDate).toISOString().split('T')[0],
            endDate: new Date(trip.endDate).toISOString().split('T')[0]
          });
        } catch (err) {
          setError('获取旅行计划失败');
        }
      };
      fetchTrip();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('请先登录');
        setLoading(false);
        return;
      }

      // 处理表单数据
      const submitData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        budget: formData.budget ? Number(formData.budget) : 0
      };

      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/trips/${id}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/trips`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('保存失败:', err);
      setError(err.response?.data?.message || '保存失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-form">
      <h2>{id ? '编辑旅行计划' : '创建新旅行计划'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>标题</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>描述</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>目的地</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>开始日期</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>结束日期</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>预算</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? '保存中...' : '保存'}
        </button>
      </form>
    </div>
  );
};

export default TripForm; 