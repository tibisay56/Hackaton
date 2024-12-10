import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import api from '../Services/api';
import '../styles.css';

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  // Handlers
  const handleCreateRedirect = () => {
    navigate('/dashboard/users/create');
  };

  const handleEditUser = (user) => {
    setEditUser(user); 
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <section className="users-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={handleCreateRedirect}
          className="bg-gray-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Crear User
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Clave</th>
            <th className="border border-gray-300 px-4 py-2">Telefono</th>
            <th className="border border-gray-300 px-4 py-2">Ciudad</th>
            <th className="border border-gray-300 px-4 py-2">Pais</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.clave}</td>
              <td className="border border-gray-300 px-4 py-2">{user.telephone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.country}</td>
              <td className="border border-gray-300 px-4 py-2">{user.city}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserSection;

