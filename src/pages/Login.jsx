
// src/pages/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ mobile: '', password: '', role: 'DKKVY_ADMIN' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let mockUser = null;
    if (formData.role === 'DKKVY_ADMIN' && formData.mobile === '9876543210' && formData.password === 'test123') {
      mockUser = { id: '1', name: 'Test Admin', role: 'DKKVY_ADMIN' };
    } else if (formData.role === 'AGENCY' && formData.mobile === '9999911111' && formData.password === 'agency123') {
      mockUser = { id: '2', name: 'Test Agency', role: 'AGENCY' };
    } else if (formData.role === 'APPLICANT' && formData.mobile === '9999922222' && formData.password === 'applicant123') {
      mockUser = { id: '3', name: 'Test Applicant', role: 'APPLICANT' };
    } else {
      alert(`Invalid credentials! Use:\n- Admin: 9876543210 / test123\n- Agency: 9999911111 / agency123\n- Applicant: 9999922222 / applicant123`);
      return;
    }
    
    dispatch({ 
      type: 'auth/login/fulfilled', 
      payload: { 
        user: mockUser, 
        accessToken: 'mock-token', 
        refreshToken: 'mock-refresh' 
      } 
    });
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('accessToken', 'mock-token');
    localStorage.setItem('refreshToken', 'mock-refresh');
    
    // Redirect to appropriate dashboard based on role
    if (mockUser.role === 'AGENCY') {
      navigate('/agency-dashboard');
    } else if (mockUser.role === 'APPLICANT') {
      navigate('/applicant-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="mb-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center mb-6">
            ← Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              D
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">DKKVY Portal Login</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>
        
        {/* Test Credentials Box */}
        <div className="mb-8 p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-sm font-semibold text-blue-800 mb-3">Test Credentials:</p>
          <ul className="text-sm text-blue-700 space-y-2">
            <li><strong>Admin:</strong> 9876543210 / test123</li>
            <li><strong>Agency:</strong> 9999911111 / agency123</li>
            <li><strong>Applicant:</strong> 9999922222 / applicant123</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
            {error}
            <button onClick={() => dispatch(clearError())} className="font-bold">×</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Login As</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="DKKVY_ADMIN">DKKVY Admin</option>
              <option value="AGENCY">Training Agency</option>
              <option value="APPLICANT">Applicant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
