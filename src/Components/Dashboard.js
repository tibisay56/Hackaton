import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RouteManager from './RouteManager';
import CommentsSection from './CommentsSection';
import UsersSection from './UsersSection';
import RolesSection from './RolesSection';
import Navbar from './Navbar';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
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
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="comments/create" element={<CreateComment />} />
            <Route path="comments" element={<CommentsSection />} />
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