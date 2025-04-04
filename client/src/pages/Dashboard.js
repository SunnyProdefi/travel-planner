import React from 'react';
import TripList from '../components/TripList';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>旅行计划管理</h1>
      </header>
      <main>
        <TripList />
      </main>
    </div>
  );
};

export default Dashboard;
