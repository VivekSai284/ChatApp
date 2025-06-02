// ChatApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css'

const ChatApp = () => {
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);

  // Decode JWT to get user_id
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const data = JSON.parse(jsonPayload);
      setSenderId(data.user_id);
      console.log('Logged in as user:', data.user_id);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    if (!token || !senderId || !receiverId) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/api/chat/messages/chat/?user1=${senderId}&user2=${receiverId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.error('Fetch error:', error.response?.data);
    }
  };

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    if (!token || !senderId || !receiverId || !message) return;

    try {
      await axios.post(
        'http://localhost:8000/api/chat/messages/',
        {
          sender: senderId,
          receiver: receiverId,
          content: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Send error:', error.response?.data);
    }
  };

  useEffect(() => {
    if (senderId && receiverId) {
      fetchMessages();
    }
  }, [senderId, receiverId]);

  return (
    <div className='chat-app' style={{ padding: '20px', maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Chat App</h2>
      <div className='imp-msg'>{senderId && <p>You are logged in as user ID: {senderId}</p>}</div>
      

      <div className='receiver' style={{ marginBottom: 20 }}>
        <input
        className='receiver-id'
          type="number"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button className='message-btn' onClick={fetchMessages}>Load Messages</button>
      </div>

      <div className='message' style={{ marginBottom: 20 }}>
        <input
        className='messager'
          type="text"
          placeholder="Type a message...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '70%', marginRight: 10,background:'white', color:'green' }}
        />
        <button className='send-btn' onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h4 style={{color:'green'}}>Chat Messages: </h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {messages.map((msg) => (
            <li key={msg.id} style={{ marginBottom: 10, }}>
              <div className='chat-messages'><strong>{msg.sender_username}</strong> → <strong>{msg.receiver_username}</strong>: <span className='span-msg'>{msg.content}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatApp;
