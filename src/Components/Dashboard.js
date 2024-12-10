import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RouteManager from './RouteManager';
import UsersSection from './UsersSection';
import Navbar from './Navbar';
import CreateUser from './CreateUser';
import '../styles.css';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-main flex">
        <Sidebar /> 
        <div className="content flex-1 p-8">
          
          <Routes>
            <Route path="route-manager" element={<RouteManager />} />
            <Route path="users" element={<UsersSection />} />
            <Route path="users/create" element={<CreateUser />} />
          </Routes>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;