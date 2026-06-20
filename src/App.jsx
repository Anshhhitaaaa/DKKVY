
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplicantList from './pages/ApplicantList';
import ApplicantRegistration from './pages/ApplicantRegistration';
import AgencyRegistration from './pages/AgencyRegistration';
import Reports from './pages/Reports';
import RegistrationSuccess from './pages/RegistrationSuccess';
import ApplicantDashboard from './pages/ApplicantDashboard';
import ApplicantProfile from './pages/ApplicantProfile';
import AgencyDashboard from './pages/AgencyDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/applicant-registration" element={<ApplicantRegistration />} />
        <Route path="/agency-registration" element={<AgencyRegistration />} />
        <Route path="/registration/success" element={<RegistrationSuccess />} />
          <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
          <Route path="/agency-dashboard" element={<AgencyDashboard />} />
          <Route path="/applicant-profile" element={<ApplicantProfile />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicants"
          element={
            <ProtectedRoute>
              <ApplicantList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
