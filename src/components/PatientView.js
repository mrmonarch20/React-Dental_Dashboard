import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getIncidents, getPatients } from '../utils/mockData';

const PatientView = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    loadPatientData();
  }, [user]);

  const loadPatientData = () => {
    if (user?.patientId) {
      const patients = getPatients();
      const incidents = getIncidents();
      
      const patient = patients.find(p => p.id === user.patientId);
      const patientAppointments = incidents
        .filter(inc => inc.patientId === user.patientId)
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
      
      setPatientInfo(patient);
      setAppointments(patientAppointments);
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status !== 'Completed'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) <= new Date() || apt.status === 'Completed'
  );

  if (!patientInfo) {
    return (
      <div className="container">
        <div className="card">
          <h2>Patient information not found</h2>
          <p>Please contact the dental center to set up your patient profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Dental Records</h1>
      
      <div className="card">
        <h2>Personal Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div><strong>Name:</strong> {patientInfo.name}</div>
          <div><strong>Date of Birth:</strong> {patientInfo.dob}</div>
          <div><strong>Contact:</strong> {patientInfo.contact}</div>
          <div><strong>Email:</strong> {patientInfo.email}</div>
          <div><strong>Health Info:</strong> {patientInfo.healthInfo}</div>
        </div>
      </div>

      <div className="card">
        <h2>Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments scheduled.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(apt => (
                <tr key={apt.id}>
                  <td>{new Date(apt.appointmentDate).toLocaleString()}</td>
                  <td>{apt.title}</td>
                  <td>{apt.description}</td>
                  <td>{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2>Treatment History</h2>
        {pastAppointments.length === 0 ? (
          <p>No treatment history available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Treatment</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Next Appointment</th>
              </tr>
            </thead>
            <tbody>
              {pastAppointments.map(apt => (
                <tr key={apt.id}>
                  <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                  <td>{apt.treatment || apt.title}</td>
                  <td>{apt.description}</td>
                  <td>${apt.cost || 0}</td>
                  <td>{apt.status}</td>
                  <td>
                    {apt.nextDate ? new Date(apt.nextDate).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {appointments.some(apt => apt.files && apt.files.length > 0) && (
        <div className="card">
          <h2>Treatment Files</h2>
          {appointments
            .filter(apt => apt.files && apt.files.length > 0)
            .map(apt => (
              <div key={apt.id} style={{ marginBottom: '15px' }}>
                <h4>{apt.title} - {new Date(apt.appointmentDate).toLocaleDateString()}</h4>
                <ul>
                  {apt.files.map((file, index) => (
                    <li key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PatientView;