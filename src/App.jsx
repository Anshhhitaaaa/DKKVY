
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
import Agencies from './pages/Agencies';
import Batches from './pages/Batches';
import Attendance from './pages/Attendance';
import Assessment from './pages/Assessment';
import Stipend from './pages/Stipend';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';
import Benefits from './pages/Benefits';
import Catalogue from './pages/Catalogue';
import Sectors from './pages/Sectors';
import Audit from './pages/Audit';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Profile from './pages/Profile';

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
        
        {/* Admin Routes */}
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
          path="/agencies"
          element={
            <ProtectedRoute>
              <Agencies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <Batches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stipend"
          element={
            <ProtectedRoute>
              <Stipend />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/benefits"
          element={
            <ProtectedRoute>
              <Benefits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalogue"
          element={
            <ProtectedRoute>
              <Catalogue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sectors"
          element={
            <ProtectedRoute>
              <Sectors />
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
        <Route
          path="/audit"
          element={
            <ProtectedRoute>
              <Audit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
