import React, { useState, useEffect } from 'react';
import { getPatients, getIncidents, saveIncidents, generateId } from '../utils/mockData';
import FileUpload from './FileUpload';

const AppointmentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Scheduled',
    nextDate: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIncidents(getIncidents());
    setPatients(getPatients());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentIncidents = getIncidents();
    
    if (editingIncident) {
      const updatedIncidents = currentIncidents.map(inc => 
        inc.id === editingIncident.id ? { ...formData, id: editingIncident.id, files: editingIncident.files || [] } : inc
      );
      saveIncidents(updatedIncidents);
    } else {
      const newIncident = { ...formData, id: generateId(), files: [] };
      saveIncidents([...currentIncidents, newIncident]);
    }
    
    loadData();
    closeModal();
  };

  const handleEdit = (incident) => {
    setEditingIncident(incident);
    setFormData({
      patientId: incident.patientId,
      title: incident.title,
      description: incident.description,
      comments: incident.comments,
      appointmentDate: incident.appointmentDate.slice(0, 16),
      cost: incident.cost || '',
      treatment: incident.treatment || '',
      status: incident.status,
      nextDate: incident.nextDate ? incident.nextDate.slice(0, 16) : ''
    });
    setShowModal(true);
  };

  const handleDelete = (incidentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const currentIncidents = getIncidents();
      const updatedIncidents = currentIncidents.filter(inc => inc.id !== incidentId);
      saveIncidents(updatedIncidents);
      loadData();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIncident(null);
    setFormData({
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: 'Scheduled',
      nextDate: ''
    });
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Appointment Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Appointment
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{getPatientName(incident.patientId)}</td>
                <td>{incident.title}</td>
                <td>{new Date(incident.appointmentDate).toLocaleString()}</td>
                <td>{incident.status}</td>
                <td>${incident.cost || 0}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(incident)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(incident.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingIncident ? 'Edit Appointment' : 'Add New Appointment'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Patient:</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Comments:</label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Appointment Date & Time:</label>
                <input
                  type="datetime-local"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cost ($):</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value) || ''})}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Treatment:</label>
                <input
                  type="text"
                  value={formData.treatment}
                  onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Next Appointment Date:</label>
                <input
                  type="datetime-local"
                  value={formData.nextDate}
                  onChange={(e) => setFormData({...formData, nextDate: e.target.value})}
                />
              </div>
              
              <FileUpload
                existingFiles={formData.files || []}
                onFilesChange={(files) => setFormData({...formData, files})}
              />
              <div>
                <button type="submit" className="btn btn-success">
                  {editingIncident ? 'Update' : 'Add'} Appointment
                </button>
                <button type="button" className="btn btn-danger" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;