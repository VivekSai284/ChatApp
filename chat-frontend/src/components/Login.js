import React, { useState } from 'react';
import API, { setAuthToken } from '../utils/api';
import { jwtDecode } from 'jwt-decode'; // ✅ correct import
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/jwt/create/', formData);
      const token = res.data.access;

      // Save token and set auth headers
      localStorage.setItem('token', token);
      setAuthToken(token);

      // Decode token to get user info
      const user = jwtDecode(token); // ✅ corrected
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="p-4-max-w-sm-mx-auto">
      <h2 className="text-xl-mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full-p-3-border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
