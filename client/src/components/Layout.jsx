
// src/components/Layout.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col shadow-xl">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <div>
              <h2 className="font-bold text-lg">DKKVY Portal</h2>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Logged in as</p>
          <p className="font-semibold text-white">{user?.name || 'User'}</p>
          <p className="text-xs text-blue-400">{user?.role}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-700 transition-all text-gray-200 hover:text-white"
          >
            <span>📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link
            to="/applicants"
            className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-700 transition-all text-gray-200 hover:text-white"
          >
            <span>👥</span>
            <span className="font-medium">Applicants</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-700 transition-all text-gray-200 hover:text-white"
          >
            <span>📈</span>
            <span className="font-medium">Reports</span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto w-full p-4 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-600 hover:text-white transition-all font-medium"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name || 'User'}!</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
