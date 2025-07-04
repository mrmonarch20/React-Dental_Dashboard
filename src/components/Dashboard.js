import React, { useEffect, useState } from 'react';
import { getPatients, getIncidents, initializeMockData } from '../utils/mockData';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    upcomingAppointments: 0,
    completedTreatments: 0,
    totalRevenue: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    initializeMockData();
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const patients = getPatients();
    const incidents = getIncidents();
    
    const upcoming = incidents
      .filter(inc => new Date(inc.appointmentDate) > new Date() && inc.status !== 'Completed')
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 10);
    
    const completed = incidents.filter(inc => inc.status === 'Completed');
    const revenue = completed.reduce((sum, inc) => sum + (inc.cost || 0), 0);

    setStats({
      totalPatients: patients.length,
      upcomingAppointments: upcoming.length,
      completedTreatments: completed.length,
      totalRevenue: revenue
    });

    setUpcomingAppointments(upcoming.map(inc => ({
      ...inc,
      patientName: patients.find(p => p.id === inc.patientId)?.name || 'Unknown'
    })));
  };

  return (
    <div className="container">
      <h1>Dental Center Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.totalPatients}</div>
          <div>Total Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.upcomingAppointments}</div>
          <div>Upcoming Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completedTreatments}</div>
          <div>Completed Treatments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">${stats.totalRevenue}</div>
          <div>Total Revenue</div>
        </div>
      </div>

      <div className="card">
        <h2>Next 10 Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.title}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;