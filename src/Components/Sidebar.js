import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-200 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold text-black mb-4">Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard/route-manager" className="block py-2 px-4 text-black hover:bg-white rounded">
            Route Manager
          </Link>
        </li>
        <li>
          <Link to="/dashboard/comments" className="block py-2 px-4 text-black hover:bg-white rounded">
          Fleet monitoring
          </Link>
        </li>
        <li>
          <Link to="/dashboard/users" className="block py-2 px-4 text-black hover:bg-white rounded">
            Usuarios
          </Link>
        </li>
        <li>
          <Link to="/dashboard/roles" className="block py-2 px-4 text-black hover:bg-white rounded">
            Roles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;