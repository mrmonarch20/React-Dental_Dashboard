import React, { useState, useEffect } from 'react';
import { getIncidents, getPatients } from '../utils/mockData';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    setAppointments(getIncidents());
    setPatients(getPatients());
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDay = (day) => {
    if (!day) return [];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const targetDate = new Date(year, month, day);
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate.toDateString() === targetDate.toDateString();
    });
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="container">
      <h1>Calendar View</h1>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button className="btn btn-primary" onClick={() => navigateMonth(-1)}>
            Previous
          </button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button className="btn btn-primary" onClick={() => navigateMonth(1)}>
            Next
          </button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(dayName => (
            <div key={dayName} style={{ padding: '10px', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
              {dayName}
            </div>
          ))}
          
          {days.map((day, index) => {
            const dayAppointments = getAppointmentsForDay(day);
            return (
              <div
                key={index}
                className={`calendar-day ${dayAppointments.length > 0 ? 'has-appointment' : ''}`}
                onClick={() => handleDayClick(day)}
                style={{ cursor: day ? 'pointer' : 'default' }}
              >
                {day && (
                  <>
                    <div style={{ fontWeight: 'bold' }}>{day}</div>
                    {dayAppointments.map(apt => (
                      <div key={apt.id} className="appointment-dot" title={apt.title}></div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div className="card">
          <h3>Appointments for {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}</h3>
          {getAppointmentsForDay(selectedDay).length === 0 ? (
            <p>No appointments scheduled for this day.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Title</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {getAppointmentsForDay(selectedDay).map(apt => (
                  <tr key={apt.id}>
                    <td>{new Date(apt.appointmentDate).toLocaleTimeString()}</td>
                    <td>{getPatientName(apt.patientId)}</td>
                    <td>{apt.title}</td>
                    <td>{apt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;