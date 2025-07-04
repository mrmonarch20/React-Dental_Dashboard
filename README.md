# Dental Center Management Dashboard

A React-based dental center management system for managing patients, appointments, and treatment records.

## Features

### Admin (Dentist) Features
- **Dashboard**: View KPIs including total patients, upcoming appointments, completed treatments, and revenue
- **Patient Management**: Add, edit, delete, and view patient information
- **Appointment Management**: Schedule, modify, and track dental appointments
- **Calendar View**: Monthly calendar showing scheduled appointments
- **Treatment Records**: Manage treatment details, costs, and follow-up appointments

### Patient Features
- **Personal Dashboard**: View personal information and appointment history
- **Upcoming Appointments**: See scheduled appointments
- **Treatment History**: View past treatments with costs and details
- **File Access**: Access treatment-related files and documents

## Technology Stack

- **Frontend**: React 18 with functional components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Custom CSS with responsive design
- **Data Storage**: localStorage (simulated backend)
- **Authentication**: Simulated with hardcoded users

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dental-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open http://localhost:3000 in your browser
   - Use demo credentials to login

## Demo Credentials

### Admin Account
- Email: admin@entnt.in
- Password: admin123

### Patient Account
- Email: john@entnt.in
- Password: patient123

## Project Structure

```
src/
├── components/
│   ├── Login.js              # Login component
│   ├── Navbar.js             # Navigation bar
│   ├── Dashboard.js          # Admin dashboard
│   ├── PatientManagement.js  # Patient CRUD operations
│   ├── AppointmentManagement.js # Appointment CRUD operations
│   ├── Calendar.js           # Calendar view
│   └── PatientView.js        # Patient dashboard
├── context/
│   └── AuthContext.js        # Authentication context
├── utils/
│   └── mockData.js           # Data management utilities
├── App.js                    # Main app component
├── App.css                   # Styling
└── index.js                  # Entry point
```

## Key Features Implementation

### Authentication
- Role-based access control (Admin/Patient)
- Session persistence via localStorage
- Protected routes based on user roles

### Data Management
- All data stored in localStorage
- Mock data initialization on first load
- CRUD operations for patients and appointments

### Responsive Design
- Mobile-friendly interface
- Flexible grid layouts
- Responsive tables and forms

### User Experience
- Intuitive navigation
- Modal forms for data entry
- Confirmation dialogs for destructive actions
- Real-time data updates

## Architecture Decisions

1. **Context API over Redux**: Chosen for simplicity given the application size
2. **localStorage**: Used to simulate backend persistence as required
3. **Functional Components**: Modern React approach with hooks
4. **CSS-in-JS avoided**: Custom CSS for better performance and simplicity
5. **Component Structure**: Separated by feature for better maintainability

## Known Issues & Limitations

1. **File Upload**: Currently simulated - files are not actually stored
2. **Data Validation**: Basic validation implemented
3. **Error Handling**: Minimal error boundaries
4. **Performance**: No optimization for large datasets
5. **Security**: No real authentication or data encryption

## Future Enhancements

- Real backend integration
- File upload functionality
- Advanced search and filtering
- Email notifications
- Reporting and analytics
- Multi-language support

## Deployment

The application can be deployed to:
- Vercel: `npm run build` then deploy build folder
- Netlify: Connect repository for automatic deployment
- GitHub Pages: Use gh-pages package

## Development

### Available Scripts
- `npm start`: Run development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes with proper commit messages
4. Submit a pull request

## License

This project is for educational purposes as part of the ENTNT technical assignment.