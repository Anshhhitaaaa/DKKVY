
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin', role: 'DKVIB Admin' };

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { id: 'applicants', icon: '👥', label: 'Applicants', path: '/applicants' },
    { id: 'agencies', icon: '🏢', label: 'Agencies', path: '/agencies' },
    { id: 'batches', icon: '📅', label: 'Batches', path: '/batches' },
    { id: 'attendance', icon: '✅', label: 'Attendance', path: '/attendance' },
    { id: 'assessment', icon: '📝', label: 'Assessment', path: '/assessment' },
    { id: 'stipend', icon: '💰', label: 'Stipend', path: '/stipend' },
    { id: 'payments', icon: '💳', label: 'Payments', path: '/payments' },
    { id: 'certificates', icon: '🎓', label: 'Certificates', path: '/certificates' },
    { id: 'benefits', icon: '🎁', label: 'Benefits', path: '/benefits' },
    { id: 'catalogue', icon: '🛍', label: 'e-Catalogue', path: '/catalogue' },
    { id: 'sectors', icon: '🎯', label: 'Sectors', path: '/sectors' },
    { id: 'reports', icon: '📊', label: 'MIS Reports', path: '/reports' },
    { id: 'audit', icon: '🛡', label: 'Audit Trail', path: '/audit' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', path: '/notifications' },
    { id: 'settings', icon: '⚙️', label: 'Settings', path: '/settings' },
    { id: 'profile', icon: '👤', label: 'My Profile', path: '/profile' },
    { id: 'users', icon: '👥', label: 'User Mgmt', path: '/users' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A2240] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 mx-auto">
            {user.name?.charAt(0) || 'A'}
          </div>
          <h3 className="text-lg font-bold text-center">{user.name || 'Admin'}</h3>
          <p className="text-blue-200 text-sm text-center">{user.role || 'DKVIB Admin'}</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-all ${
                location.pathname === item.path 
                  ? 'border-l-4 border-[#FF6B00] text-[#FF6B00] bg-gray-800' 
                  : 'text-gray-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('accessToken');
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-800 text-gray-300 transition-all rounded-lg"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button className="text-2xl text-gray-700">≡</button>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏛</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{title || 'DKKVY Admin Portal'}</h2>
                <p className="text-sm text-gray-600">Delhi Khadi & Village Industries Board</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-700 hover:text-gray-900">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">8</span>
            </button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">हिंदी</button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-all"
              >
                {user.name?.charAt(0) || 'A'}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">{user.name || 'Admin'}</p>
                    <p className="text-sm text-gray-500">{user.role || 'DKVIB Admin'}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">👤</span>
                    <span className="font-medium text-gray-900">My Profile</span>
                  </Link>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">🔒</span>
                    <span className="font-medium text-gray-900">Change Password</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      localStorage.removeItem('user');
                      localStorage.removeItem('accessToken');
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100"
                  >
                    <span className="text-xl">🚪</span>
                    <span className="font-medium text-gray-900">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Scrollable */}
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
