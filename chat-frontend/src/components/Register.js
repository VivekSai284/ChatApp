import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/users/', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-4-max-w-sm-mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
        <input type="password" name="re_password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Register</button>
      </form>
    </div>
  );
}

export default Register;
