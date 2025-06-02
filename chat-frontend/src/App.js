import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/App.css'
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import './components/Navbar.css'
import UserList from './components/UserList';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
        <PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
