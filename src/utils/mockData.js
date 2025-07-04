// Initialize mock data in localStorage
export const initializeMockData = () => {
  if (!localStorage.getItem('patients')) {
    const mockPatients = [
      {
        id: "p1",
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        email: "john@entnt.in",
        healthInfo: "No allergies"
      },
      {
        id: "p2",
        name: "Jane Smith",
        dob: "1985-08-15",
        contact: "0987654321",
        email: "jane@example.com",
        healthInfo: "Diabetic"
      }
    ];
    localStorage.setItem('patients', JSON.stringify(mockPatients));
  }

  if (!localStorage.getItem('incidents')) {
    const mockIncidents = [
      {
        id: "i1",
        patientId: "p1",
        title: "Toothache",
        description: "Upper molar pain",
        comments: "Sensitive to cold",
        appointmentDate: "2025-07-15T10:00:00",
        cost: 80,
        treatment: "Root canal treatment",
        status: "Completed",
        nextDate: "2025-08-15T10:00:00",
        files: []
      },
      {
        id: "i2",
        patientId: "p1",
        title: "Dental Cleaning",
        description: "Regular checkup and cleaning",
        comments: "Good oral hygiene",
        appointmentDate: "2025-07-20T14:00:00",
        cost: 50,
        treatment: "Professional cleaning",
        status: "Scheduled",
        nextDate: "",
        files: []
      },
      {
        id: "i3",
        patientId: "p2",
        title: "Cavity Filling",
        description: "Small cavity in lower molar",
        comments: "Minor decay",
        appointmentDate: "2025-07-18T11:00:00",
        cost: 120,
        treatment: "Composite filling",
        status: "Completed",
        nextDate: "2025-12-18T11:00:00",
        files: []
      }
    ];
    localStorage.setItem('incidents', JSON.stringify(mockIncidents));
  }
};

export const getPatients = () => {
  return JSON.parse(localStorage.getItem('patients') || '[]');
};

export const savePatients = (patients) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const getIncidents = () => {
  return JSON.parse(localStorage.getItem('incidents') || '[]');
};

export const saveIncidents = (incidents) => {
  localStorage.setItem('incidents', JSON.stringify(incidents));
};

export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};