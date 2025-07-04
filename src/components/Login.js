import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      // Redirect handled by Navigate component
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Dental Center Login</h2>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>
        
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin@entnt.in / admin123</p>
          <p>Patient: john@entnt.in / patient123</p>
        </div>
      </form>
    </div>
  );
};

export default Login;