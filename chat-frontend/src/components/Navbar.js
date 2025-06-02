import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="p-4-bg-gray-200-flex-justify-between">
      <div className="font-bold"><Link to="/" style={{textDecoration:'none', color:'greenyellow'}}>ChatApp</Link></div>
      <div className="space-x-4">
        
        <Link to="/login"style={{textDecoration:'none', color:'lightgreen'}}>Login</Link>
        <Link to="/register"style={{textDecoration:'none', color:'lightgreen'}}>Register</Link>
        <button onClick={handleLogout} className="text-red-501">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
