import React, { useState, useEffect } from 'react';
import { getPatients, savePatients, generateId } from '../utils/mockData';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    healthInfo: ''
  });

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    setPatients(getPatients());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPatients = getPatients();
    
    if (editingPatient) {
      const updatedPatients = currentPatients.map(p => 
        p.id === editingPatient.id ? { ...formData, id: editingPatient.id } : p
      );
      savePatients(updatedPatients);
    } else {
      const newPatient = { ...formData, id: generateId() };
      savePatients([...currentPatients, newPatient]);
    }
    
    loadPatients();
    closeModal();
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData(patient);
    setShowModal(true);
  };

  const handleDelete = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const currentPatients = getPatients();
      const updatedPatients = currentPatients.filter(p => p.id !== patientId);
      savePatients(updatedPatients);
      loadPatients();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPatient(null);
    setFormData({ name: '', dob: '', contact: '', email: '', healthInfo: '' });
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Patient Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Patient
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Health Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.dob}</td>
                <td>{patient.contact}</td>
                <td>{patient.email}</td>
                <td>{patient.healthInfo}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(patient)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>
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
            <h2>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact:</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Health Information:</label>
                <textarea
                  value={formData.healthInfo}
                  onChange={(e) => setFormData({...formData, healthInfo: e.target.value})}
                  rows="3"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success">
                  {editingPatient ? 'Update' : 'Add'} Patient
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

export default PatientManagement;