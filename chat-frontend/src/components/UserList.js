// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCurrentUser = async () => {
      const res = await axios.get('http://localhost:8000/api/auth/users/me/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserId(res.data.id);
    };

    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:8000/api/auth/users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    fetchCurrentUser().then(fetchUsers);
  }, []);

  const filteredUsers = users.filter(user => user.id !== currentUserId);

  return (
    <div>
      <h2>Other Users</h2>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => onSelectUser(user)} style={{ cursor: 'pointer' }}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
