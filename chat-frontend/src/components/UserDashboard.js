// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:8000/api/auth/users/me/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
      });
    }
  }, []);

  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID: {user.id}</p>
    </div>
  );
};

export default UserDashboard;
