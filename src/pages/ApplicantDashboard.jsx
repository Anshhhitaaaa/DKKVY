
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const sidebarItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'application', icon: '📋', label: 'Application' },
    { id: 'batch', icon: '📅', label: 'My Batch' },
    { id: 'attendance', icon: '✅', label: 'Attendance' },
    { id: 'assessment', icon: '📝', label: 'Assessment' },
    { id: 'stipend', icon: '💰', label: 'Stipend' },
    { id: 'certificate', icon: '🎓', label: 'Certificate' },
    { id: 'benefits', icon: '🎁', label: 'My Benefits' },
    { id: 'products', icon: '🛍', label: 'My Products' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'password', icon: '🔒', label: 'Change Pass' },
  ];

  const attendanceDays = [
    { day: 'D1', date: '10/6', status: 'present' },
    { day: 'D2', date: '11/6', status: 'present' },
    { day: 'D3', date: '12/6', status: 'present' },
    { day: 'D4', date: '13/6', status: 'present' },
    { day: 'D5', date: '14/6', status: 'present' },
    { day: 'D6', date: '15/6', status: 'absent' },
    { day: 'D7', date: '16/6', status: 'present' },
    { day: 'D8', date: '17/6', status: 'present' },
    { day: 'D9', date: '18/6', status: 'present' },
    { day: 'D10', date: '19/6', status: 'present' },
    { day: 'D11', date: '20/6', status: 'upcoming' },
    { day: 'D12', date: '21/6', status: 'upcoming' },
  ];

  const journeySteps = [
    { icon: '✅', title: 'Registered', date: '01 Jun 2026', desc: 'Application submitted successfully', extra: 'ID: DKKVY202600143', status: 'completed' },
    { icon: '✅', title: 'Application Approved', date: '03 Jun 2026', desc: 'Approved by DKVIB Admin', extra: '', status: 'completed' },
    { icon: '✅', title: 'Batch Assigned', date: '04 Jun 2026', desc: 'TAI-001 · Skill India Foundation', extra: '10 Jun – 21 Jun 2026', status: 'completed' },
    { icon: '✅', title: 'Training Started', date: '10 Jun 2026', desc: 'Day 1 attendance marked ✓', extra: '', status: 'completed' },
    { icon: '⏳', title: 'Assessment', date: 'Scheduled 22 Jun 2026', desc: 'Practical + Theory exam', extra: '', status: 'pending' },
    { icon: '⏳', title: 'Certificate', date: 'Not yet generated', desc: 'Requires: 100% attendance + Pass assessment', extra: '', status: 'pending' },
    { icon: '⏳', title: 'Stipend Payment', date: 'Pending eligibility', desc: '₹1,600 (₹400 + ₹1,200 food support)', extra: '', status: 'pending' },
  ];

  const notifications = [
    { icon: '🟠', title: 'Your stipend of ₹1,600 is being processed', time: 'Today 10:30 AM' },
    { icon: '🟢', title: 'Assessment result: PASS — 78/100', time: '22 Jun 2026' },
    { icon: '🔵', title: 'Batch TAI-001 attendance Day 10 marked', time: '19 Jun 2026' },
    { icon: '🟢', title: 'Certificate generated: DKKVY-CERT-2026-02106', time: '18 Jun 2026' },
  ];

  const getDayStyle = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'absent':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'upcoming':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  };

  const getDayIcon = (status) => {
    switch (status) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'upcoming':
        return '⏳';
      default:
        return '⏳';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A2240] text-white flex flex-col shadow-xl">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-3">
            RS
          </div>
          <h3 className="text-lg font-bold">Riya Sharma</h3>
          <p className="text-blue-300 text-sm">DKKVY202600143</p>
          <p className="text-gray-400 text-xs mt-1">Tailoring Trade</p>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-all ${
                activeTab === item.id
                  ? 'border-l-4 border-[#FF6B00] text-[#FF6B00] bg-gray-800'
                  : 'text-gray-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
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
                <h2 className="text-xl font-bold text-gray-800">DKKVY Portal</h2>
                <p className="text-xs text-gray-500">Delhi Khadi Kaushal Vikas Yojna</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-700 hover:text-gray-900">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">हिंदी</button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-all"
              >
                RS
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">Riya Sharma</p>
                    <p className="text-sm text-gray-500">DKKVY202600143</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/applicant-profile');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">👤</span>
                    <span className="font-medium text-gray-900">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
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

        {/* Main Content */}
        <div className="p-6 space-y-6 overflow-auto">
          {/* Section 1: Welcome Banner */}
          <section id="dashboard" className="bg-gradient-to-r from-[#FF6B00] to-[#D4A017] p-8 rounded-2xl shadow-lg text-white">
            <h2 className="text-3xl font-extrabold mb-3">👋 Welcome back, Riya Sharma!</h2>
            <div className="flex flex-wrap gap-4 text-lg mb-6">
              <p>Applicant ID: <span className="font-bold">DKKVY202600143</span></p>
              <span className="hidden sm:inline">|</span>
              <p>Applied: <span className="font-semibold">01 Jun 2026</span></p>
            </div>
            <div className="flex flex-wrap gap-6 mb-6 text-lg">
              <p>Training: <span className="font-semibold">Tailoring Trade</span></p>
              <p>Batch: <span className="font-semibold">TAI-001</span></p>
              <p>Agency: <span className="font-semibold">Skill India Foundation</span></p>
            </div>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#FF6B00] transition-all">
              📥 Download Admit Card
            </button>
          </section>


          {/* Section 2: Status Cards */}
          <section id="application" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Application Status Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Application</h3>
              <div className="text-5xl mb-3">✅</div>
              <p className="text-2xl font-bold text-gray-800">Approved</p>
              <p className="text-gray-500 mt-2">01 Jun 2026</p>
            </div>
            {/* Batch Status Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Batch</h3>
              <div className="text-5xl mb-3">🏫</div>
              <p className="text-2xl font-bold text-gray-800">Assigned</p>
              <p className="text-gray-500 mt-2">TAI-001</p>
              <p className="text-gray-500 text-sm">10–21 Jun</p>
            </div>
            {/* Attendance Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Attendance</h3>
              <div className="text-5xl mb-3">📅</div>
              <p className="text-2xl font-bold text-gray-800">9 / 12</p>
              <p className="text-gray-500 mt-2">75%</p>
              <div className="w-full h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-[#FF6B00] to-[#D4A017]"></div>
              </div>
            </div>
            {/* Stipend Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Stipend</h3>
              <div className="text-5xl mb-3">💰</div>
              <p className="text-2xl font-bold text-orange-600">Pending</p>
              <p className="text-gray-500 mt-2">₹1,600 due</p>
            </div>
          </section>

          {/* Section 3: 12-Day Attendance Tracker */}
          <section id="attendance" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📅 My Training Attendance
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">Details</button>
            </div>
            <p className="text-gray-600 mb-4">
              Batch: TAI-001 | 10 Jun – 21 Jun 2026
            </p>
            <div className="flex gap-6 mb-6 text-gray-700">
              <span>9 Present</span>
              <span>·</span>
              <span>1 Absent</span>
              <span>·</span>
              <span>2 Remaining</span>
            </div>
            {/* Attendance Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
              {attendanceDays.map((day) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${getDayStyle(day.status)}`}
                >
                  <p className="text-sm mb-2">{day.day}</p>
                  <p className="text-2xl mb-2">{getDayIcon(day.status)}</p>
                  <p className="text-xs">{day.date}</p>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-6 text-gray-700">
              <span className="flex items-center gap-2"><span className="text-xl">✅</span> Present</span>
              <span className="flex items-center gap-2"><span className="text-xl">❌</span> Absent</span>
              <span className="flex items-center gap-2"><span className="text-xl">⏳</span> Upcoming</span>
            </div>
            {/* Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl text-yellow-800">
              <p className="font-semibold">⚠️ You have 1 absent day.</p>
              <p className="text-sm">You must attend all remaining days to be eligible for stipend.</p>
            </div>
          </section>

          {/* Section 4: My Journey Timeline */}
          <section id="batch" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📋 My Application Journey
            </h3>
            {/* Timeline Dots */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
              {journeySteps.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  {i < journeySteps.length - 1 && (
                    <div className={`h-1 w-8 ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            {/* Timeline Steps */}
            <div className="space-y-0 rounded-xl border border-gray-200 overflow-hidden">
              {journeySteps.map((step, i) => (
                <div
                  key={i}
                  className={`p-6 border-b border-gray-200 last:border-b-0 ${
                    step.status === 'completed' ? 'border-l-4 border-green-500' :
                    step.status === 'pending' ? 'border-l-4 border-gray-300' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h4 className="text-lg font-bold text-gray-800">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 mb-1">{step.desc}</p>
                      {step.extra && <p className="text-gray-500 text-sm">{step.extra}</p>}
                    </div>
                    <p className="text-gray-500 text-sm font-semibold whitespace-nowrap">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Training Details */}
          <section id="batch-details" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🏫 My Training Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Batch Code</span>
                  <span className="font-bold text-gray-800">TAI-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Agency</span>
                  <span className="font-bold text-gray-800">Skill India Foundation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Start</span>
                  <span className="font-bold text-gray-800">10 Jun 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Venue</span>
                  <span className="font-bold text-gray-800">DKVIB Centre, Chandni Chowk</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Sector</span>
                  <span className="font-bold text-gray-800">Tailoring</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Trainer</span>
                  <span className="font-bold text-gray-800">Mr. Ramesh Kumar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">End</span>
                  <span className="font-bold text-gray-800">21 Jun 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Seats</span>
                  <span className="font-bold text-gray-800">30 enrolled of 30</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">📞 Agency Contact: 98765XXXXX</p>
            <button className="text-[#FF6B00] font-bold hover:text-orange-700">
              📍 Training Location: [View on Map]
            </button>
          </section>

          {/* Section 6: Assessment Result */}
          <section id="assessment" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📝 Assessment Result
            </h3>
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 max-w-md mx-auto text-center">
              <p className="text-2xl font-extrabold text-green-800 mb-6">RESULT: ✅ PASS</p>
              <div className="space-y-2 text-lg mb-6">
                <p className="flex justify-between px-4">
                  <span className="text-gray-700">Practical:</span>
                  <span className="font-bold text-gray-900">82 / 100</span>
                </p>
                <p className="flex justify-between px-4">
                  <span className="text-gray-700">Theory:</span>
                  <span className="font-bold text-gray-900">74 / 100</span>
                </p>
                <div className="border-t border-green-300 my-3"></div>
                <p className="flex justify-between px-4">
                  <span className="text-gray-700 font-bold">Total:</span>
                  <span className="font-extrabold text-green-800 text-xl">78 / 100</span>
                </p>
              </div>
              <p className="text-gray-700 mb-2">Date: 22 Jun 2026</p>
              <p className="text-gray-700">Assessed by: XYZ Agency</p>
            </div>
            <p className="text-center mt-6 text-green-800 font-semibold text-lg">
              ✅ You are eligible for Certificate and Stipend
            </p>
          </section>

          {/* Section 7: Stipend & Payment */}
          <section id="stipend" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              💰 Stipend & Payment Details
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Stipend Amount</span>
                  <span className="font-bold text-gray-900">₹ 400</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Food Support</span>
                  <span className="font-bold text-gray-900">₹ 1,200 (₹100 × 12 days)</span>
                </div>
                <div className="border-t border-gray-300 my-3"></div>
                <div className="flex justify-between text-xl">
                  <span className="text-gray-700 font-bold">Total Payable</span>
                  <span className="font-extrabold text-gray-900">₹ 1,600</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold w-48">Payment Status:</span>
                <span className="text-orange-600 font-bold text-lg">⏳ Processing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold w-48">Bank Account:</span>
                <span className="text-gray-700">XXXXXXXXXXXX1234</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold w-48">Bank Name:</span>
                <span className="text-gray-700">State Bank of India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold w-48">IFSC:</span>
                <span className="text-gray-700 font-mono">SBIN0001234</span>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Eligibility Checklist</h4>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">✅</span> Attendance 100%</p>
                <p className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">✅</span> Assessment Passed</p>
                <p className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">✅</span> Bank Account Verified</p>
                <p className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">✅</span> No Duplicate Claim</p>
              </div>
            </div>
            <p className="text-gray-700">Expected payment within 7 working days</p>
          </section>

          {/* Section 8: Certificate */}
          <section id="certificate" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🎓 My Certificate
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-8 max-w-2xl mx-auto mb-6">
              <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-inner">
                <div className="text-center space-y-4">
                  <p className="text-blue-800 font-bold text-lg">Government of NCT of Delhi</p>
                  <p className="text-blue-800 font-bold text-xl">Certificate of Skill Training</p>
                  <div className="h-4"></div>
                  <p className="text-2xl font-extrabold text-gray-900">Riya Sharma</p>
                  <p className="text-xl text-gray-700">Tailoring Trade</p>
                  <p className="text-gray-600 font-mono">DKKVY-CERT-2026-02106</p>
                  <div className="flex justify-end mt-4">
                    <div className="w-20 h-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                📥 Download PDF
              </button>
              <button className="px-6 py-3 border-2 border-[#FF6B00] text-[#FF6B00] font-bold rounded-xl hover:bg-[#FF6B00] hover:text-white transition-all">
                🔗 Share
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
                ✅ Verify
              </button>
            </div>
          </section>

          {/* Section 9: My Benefits */}
          <section id="benefits" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🎁 My Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Certificate */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 p-6 rounded-2xl text-center">
                <div className="text-5xl mb-3">🎓</div>
                <p className="text-lg font-bold text-gray-800 mb-2">Certificate</p>
                <p className="text-green-700 font-bold mb-1">✅ Issued</p>
                <p className="text-gray-500 text-sm">14 Jun 2026</p>
              </div>
              {/* Identity Card */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 p-6 rounded-2xl text-center">
                <div className="text-5xl mb-3">🪪</div>
                <p className="text-lg font-bold text-gray-800 mb-2">Identity Card</p>
                <p className="text-green-700 font-bold mb-1">✅ Issued</p>
                <p className="text-gray-500 text-sm">14 Jun 2026</p>
              </div>
              {/* Sewing Machine */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 p-6 rounded-2xl text-center">
                <div className="text-5xl mb-3">🪡</div>
                <p className="text-lg font-bold text-gray-800 mb-2">Sewing Machine</p>
                <p className="text-orange-700 font-bold mb-1">⏳ Pending</p>
              </div>
            </div>
          </section>

          {/* Section 10: My Products */}
          <section id="products" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🛍 My Products in e-Catalogue
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all">
                + Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Product 1 */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                  👚
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-gray-800 mb-2">Embroidered Blouse</p>
                  <p className="text-2xl font-extrabold text-[#FF6B00] mb-3">₹600</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                    ✅ Published
                  </span>
                </div>
              </div>
              {/* Product 2 */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
                  👜
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-gray-800 mb-2">Cotton Tote Bag</p>
                  <p className="text-2xl font-extrabold text-[#FF6B00] mb-3">₹180</p>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-bold rounded-full">
                    ⏳ Pending
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="text-[#FF6B00] font-bold text-lg hover:text-orange-700">
                View Full Catalogue →
              </button>
            </div>
          </section>

          {/* Section 11: Notifications */}
          <section id="notifications" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🔔 Recent Notifications
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">View All</button>
            </div>
            <div className="space-y-4">
              {notifications.map((notif, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{notif.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{notif.title}</p>
                      <p className="text-gray-500 text-sm mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Change Password Section */}
          <section id="password" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              🔒 Change Password
            </h3>
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                  placeholder="Confirm new password"
                />
              </div>
              <button className="mt-4 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                Update Password
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
