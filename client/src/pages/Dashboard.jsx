
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';

// Sector-wise enrollment data
const sectorEnrollmentData = [
  { name: 'Tailoring', value: 650 },
  { name: 'Bakery', value: 420 },
  { name: 'Pottery', value: 280 },
  { name: 'Candle', value: 250 },
  { name: 'Soap', value: 190 },
  { name: 'Perfume', value: 160 },
  { name: 'Hair', value: 140 },
  { name: 'Makeup', value: 120 },
  { name: 'Ess. Oil', value: 100 }
];

// Monthly registration data
const monthlyTrendData = [
  { month: 'Jan', applicants: 580 },
  { month: 'Feb', applicants: 620 },
  { month: 'Mar', applicants: 700 },
  { month: 'Apr', applicants: 680 },
  { month: 'May', applicants: 750 },
  { month: 'Jun', applicants: 800 }
];

// Stipend disbursement data
const stipendData = [
  { month: 'Jan', paid: 6.2 },
  { month: 'Feb', paid: 7.0 },
  { month: 'Mar', paid: 8.5 },
  { month: 'Apr', paid: 9.0 },
  { month: 'May', paid: 7.7 }
];

// Agency performance data
const agencyPerformanceData = [
  { name: 'Skill India F.', score: 98 },
  { name: 'Delhi Craft Acad.', score: 94 },
  { name: 'Kaushal Vikas K.', score: 91 },
  { name: 'Women Emp. Hub', score: 89 },
  { name: 'Grameen Skills', score: 76 }
];

// District-wise distribution
const districtData = [
  { name: 'North Delhi', applicants: 580 },
  { name: 'South Delhi', applicants: 420 },
  { name: 'East Delhi', applicants: 380 },
  { name: 'West Delhi', applicants: 310 },
  { name: 'Central Delhi', applicants: 250 },
  { name: 'North East Delhi', applicants: 180 },
  { name: 'Shahdara', applicants: 120 }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A2240] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 mx-auto">
            SA
          </div>
          <h3 className="text-lg font-bold text-center">Sanjay Aggarwal</h3>
          <p className="text-blue-200 text-sm text-center">DKVIB Admin</p>
          <p className="text-green-400 text-sm text-center mt-1">Super Admin</p>
        </div>

        <nav className="flex-1 py-4">
          {[
            { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
            { id: 'applicants', icon: '👥', label: 'Applicants' },
            { id: 'agencies', icon: '🏢', label: 'Agencies' },
            { id: 'batches', icon: '📅', label: 'Batches' },
            { id: 'attendance', icon: '✅', label: 'Attendance' },
            { id: 'assessment', icon: '📝', label: 'Assessment' },
            { id: 'stipend', icon: '💰', label: 'Stipend' },
            { id: 'payments', icon: '💳', label: 'Payments' },
            { id: 'certificates', icon: '🎓', label: 'Certificates' },
            { id: 'benefits', icon: '🎁', label: 'Benefits' },
            { id: 'catalogue', icon: '🛍', label: 'e-Catalogue' },
            { id: 'sectors', icon: '🎯', label: 'Sectors' },
            { id: 'reports', icon: '📊', label: 'MIS Reports' },
            { id: 'audit', icon: '🛡', label: 'Audit Trail' },
            { id: 'notifications', icon: '🔔', label: 'Notifications' },
            { id: 'settings', icon: '⚙️', label: 'Settings' },
            { id: 'users', icon: '👤', label: 'User Mgmt' }
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-all ${
                item.id === 'dashboard' ? 'border-l-4 border-[#FF6B00] text-[#FF6B00] bg-gray-800' : 'text-gray-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
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
                <h2 className="text-2xl font-bold text-gray-900">DKKVY Admin Portal</h2>
                <p className="text-sm text-gray-600">Delhi Khadi &amp; Village Industries Board</p>
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
                SA
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">Sanjay Aggarwal</p>
                    <p className="text-sm text-gray-500">Super Admin</p>
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">👤</span>
                    <span className="font-medium text-gray-900">My Profile</span>
                  </button>
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
        <div className="p-6 space-y-6 overflow-auto">
          {/* Section 1: Top Alert Bar */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              ⚡ Action Required
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/agencies" className="flex items-center gap-3 px-6 py-3 bg-red-50 border-l-4 border-red-500 rounded-lg hover:bg-red-100 transition">
                <span className="text-2xl">🔴</span>
                <div>
                  <p className="font-bold text-gray-900">2 agencies pending approval</p>
                  <p className="text-sm text-gray-600">Review →</p>
                </div>
              </Link>
              <Link to="/payments" className="flex items-center gap-3 px-6 py-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg hover:bg-yellow-100 transition">
                <span className="text-2xl">🟡</span>
                <div>
                  <p className="font-bold text-gray-900">214 stipend payments pending</p>
                  <p className="text-sm text-gray-600">Process →</p>
                </div>
              </Link>
              <Link to="/catalogue" className="flex items-center gap-3 px-6 py-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg hover:bg-yellow-100 transition">
                <span className="text-2xl">🟡</span>
                <div>
                  <p className="font-bold text-gray-900">8 e-catalogue products awaiting</p>
                  <p className="text-sm text-gray-600">Approve →</p>
                </div>
              </Link>
              <Link to="/assessment" className="flex items-center gap-3 px-6 py-3 bg-green-50 border-l-4 border-green-500 rounded-lg hover:bg-green-100 transition">
                <span className="text-2xl">🟢</span>
                <div>
                  <p className="font-bold text-gray-900">3 assessment results to verify</p>
                  <p className="text-sm text-gray-600">View →</p>
                </div>
              </Link>
              <Link to="/batches" className="flex items-center gap-3 px-6 py-3 bg-green-50 border-l-4 border-green-500 rounded-lg hover:bg-green-100 transition">
                <span className="text-2xl">🟢</span>
                <div>
                  <p className="font-bold text-gray-900">5 batches awaiting approval</p>
                  <p className="text-sm text-gray-600">Review →</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Section 2: Main Stats Grid (8 Cards) */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Applicants', value: '4,382', icon: '👥', trend: '↑ 128 week', color: 'from-blue-500 to-blue-600' },
              { label: 'Agencies', value: '18', icon: '🏢', subLabel: '2 pending', color: 'from-purple-500 to-purple-600' },
              { label: 'Batches', value: '34', icon: '📅', subLabel: '6 this week', color: 'from-green-500 to-green-600' },
              { label: 'Attendance', value: '91%', icon: '✅', trend: '↑ 3% vs last', color: 'from-orange-500 to-orange-600' },
              { label: 'Stipend', value: '₹38.4L', icon: '💰', subLabel: '14 pending', color: 'from-amber-500 to-amber-600' },
              { label: 'Certificates', value: '2,106', icon: '🎓', trend: '↑ 84 month', color: 'from-teal-500 to-teal-600' },
              { label: 'Machines', value: '1,847', icon: '🪡', subLabel: '120 pending', color: 'from-indigo-500 to-indigo-600' },
              { label: 'Catalogue', value: '312', icon: '🛍', subLabel: '8 pending', color: 'from-pink-500 to-pink-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className={`p-6 bg-gradient-to-r ${stat.color} text-white`}>
                  <p className="text-sm opacity-90 mb-1">{stat.icon} {stat.label}</p>
                  <p className="text-4xl font-extrabold">{stat.value}</p>
                  {stat.trend && <p className="text-sm mt-2 opacity-90">{stat.trend}</p>}
                </div>
                {stat.subLabel && (
                  <div className="p-4">
                    <p className="text-gray-700">{stat.subLabel}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Section 3: Charts Row 1 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sector-wise Enrollment */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sector-wise Enrollment</h3>
              <BarChart
                width={500}
                height={300}
                data={sectorEnrollmentData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF6B00" radius={[0, 4, 4, 0]} />
              </BarChart>
            </div>

            {/* Monthly Registration Trend */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Registration Trend</h3>
              <LineChart
                width={500}
                height={300}
                data={monthlyTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applicants" stroke="#FF6B00" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700">Total this year: <span className="font-bold text-gray-900">4,382</span></p>
                <p className="text-gray-700"><span className="text-green-600 font-bold">↑ 18%</span> vs last year</p>
              </div>
            </div>
          </section>

          {/* Section 4: Charts Row 2 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stipend Disbursement */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Stipend Disbursement</h3>
              <AreaChart
                width={500}
                height={300}
                data={stipendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="paid" fill="#FF6B00" stroke="#FF6B00" fillOpacity={0.3} />
              </AreaChart>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700">Paid: <span className="font-bold text-gray-900">₹38.4L</span></p>
                <p className="text-gray-700">Pending: <span className="text-orange-600 font-bold">₹3.2L</span></p>
              </div>
            </div>

            {/* Agency Performance */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Agency Performance</h3>
              <BarChart
                width={500}
                height={300}
                data={agencyPerformanceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={140} />
                <Tooltip />
                <Bar dataKey="score" fill="#138808" radius={[0, 4, 4, 0]} />
              </BarChart>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Based on: completion rate + attendance + assessment pass</p>
              </div>
            </div>
          </section>

          {/* Section 5: Recent Applicants Table */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                👥 Recent Applicants
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">ID</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Name</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Sector</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'DKKVY2026-142', name: 'Riya Sharma', sector: 'Tailoring', status: 'APPROVED' },
                    { id: 'DKKVY2026-141', name: 'Priya Mehta', sector: 'Bakery', status: 'PENDING' },
                    { id: 'DKKVY2026-140', name: 'Sunita Devi', sector: 'Pottery', status: 'APPROVED' },
                    { id: 'DKKVY2026-139', name: 'Anita Gupta', sector: 'Candle', status: 'APPROVED' },
                    { id: 'DKKVY2026-138', name: 'Kavita Yadav', sector: 'Perfume', status: 'PENDING' }
                  ].map((app, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-4 text-sm text-gray-700 font-mono">{app.id}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-gray-900">{app.name}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{app.sector}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status === 'APPROVED' ? '✅ Approved' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Activity Feed */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🕐 Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { icon: '🎓', text: 'Certificate issued — Riya Sharma', time: '10:23 AM' },
                { icon: '💰', text: 'Stipend disbursed — ₹38,400 (24 beneficiaries)', time: '09:45 AM' },
                { icon: '📅', text: 'New batch started — Pottery POT-002', time: '09:12 AM' },
                { icon: '🏢', text: 'Agency approved — Grameen Skills Pvt Ltd', time: 'Yesterday' },
                { icon: '📝', text: 'Assessment completed — Bakery BAK-003', time: 'Yesterday' },
                { icon: '🛍', text: 'Product approved — Lavender Soap Bar', time: 'Yesterday' }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B00] mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      <span className="font-semibold">{activity.icon} {activity.text}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Agencies Snapshot */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🏢 Agencies Overview
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">Manage →</button>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Skill India Foundation ✅ Approved</h4>
                <p className="text-gray-700">Tailoring, Bakery | 8 batches | 186 trainees</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Grameen Skills Pvt Ltd 🟡 Pending Approval</h4>
                <p className="text-gray-700 mb-3">All Sectors | Applied: 12 Jun 2026</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#138808] text-white font-bold rounded-lg hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button className="px-4 py-2 border border-red-500 text-red-600 font-bold rounded-lg hover:bg-red-50 transition">
                    Reject
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition">
                    View Documents
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Batches Snapshot */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                📅 Batches Requiring Attention
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">View All →</button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">BATCH-TAI-001</h4>
                  <p className="text-gray-600">Running • Day 5/12 • 91% attendance</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">BATCH-BAK-004</h4>
                  <p className="text-gray-600">🟡 Awaiting approval (Grameen Skills)</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">BATCH-POT-002</h4>
                  <p className="text-gray-600">Running • Day 9/12 • 87% attendance</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Quick Actions */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              ⚡ Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition shadow-lg">
                ➕ Add Agency
              </button>
              <button className="px-6 py-3 bg-[#138808] text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg">
                📋 Add Sector
              </button>
              <button className="px-6 py-3 bg-[#1A6FBF] text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg">
                📢 Send Notice
              </button>
              <button className="px-6 py-3 bg-[#0A2240] text-white font-bold rounded-xl hover:bg-gray-900 transition shadow-lg">
                📊 Generate Report
              </button>
              <button className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-lg">
                👤 Add Admin User
              </button>
            </div>
          </section>

          {/* Section 10: Geographic Distribution */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🗺 Applicants by District
            </h3>
            <div className="space-y-3">
              {districtData.map((district, i) => (
                <div key={i} className="flex items-center gap-4">
                  <p className="w-40 text-gray-700">{district.name}</p>
                  <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6B00] to-[#D4A017] flex items-center justify-end pr-3 text-white font-bold text-sm"
                      style={{ width: `${(district.applicants / 580) * 100}%` }}
                    >
                      {district.applicants}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
