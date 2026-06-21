
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { loginAdmin } from '../services/adminService';

const Login = () => {
  const [formData, setFormData] = useState({ loginId: '', password: '', role: 'DKKVY_ADMIN' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let response;
      
      if (formData.role === 'DKKVY_ADMIN') {
        // Admin login uses admin ID and password
        response = await loginAdmin(formData.loginId, formData.password);
      } else {
        // Applicant and Agency use loginId and password
        response = await api.post('/auth/login', formData);
      }
      
      const { token, user, role, data } = response.data;
      const authUser = user || data;
      const authToken = token;
      
      localStorage.setItem('user', JSON.stringify(authUser));
      localStorage.setItem('accessToken', authToken);
      
      dispatch({
        type: 'auth/login/fulfilled',
        payload: { user: authUser, accessToken: authToken, refreshToken: 'mock-refresh' }
      });

      if (formData.role === 'AGENCY') {
        navigate('/agency-dashboard');
      } else if (formData.role === 'APPLICANT') {
        navigate('/applicant-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
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
        
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
            {error}
            <button onClick={() => setError('')} className="font-bold">×</button>
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
            <label className="block text-sm font-bold text-gray-900 mb-2">Login ID</label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your Login ID"
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
