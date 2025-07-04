import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-nav">
          <li><Link to="/">Dashboard</Link></li>
          
          {user?.role === 'Admin' && (
            <>
              <li><Link to="/patients">Patients</Link></li>
              <li><Link to="/appointments">Appointments</Link></li>
              <li><Link to="/calendar">Calendar</Link></li>
            </>
          )}
          
          <li style={{ marginLeft: 'auto' }}>
            Welcome, {user?.role} ({user?.email})
          </li>
          <li>
            <button 
              onClick={logout} 
              className="btn btn-danger"
              style={{ padding: '5px 10px' }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;