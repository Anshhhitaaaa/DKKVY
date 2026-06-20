
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgencyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSector, setActiveSector] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample agency data (can be replaced with API data later)
  const agencyData = {
    name: "Skill India Foundation",
    code: "AGY-2026-001",
    approvalDate: "03 Jun 2026",
    contactName: "Rajesh Kumar",
    contactMobile: "98765XXXXX",
    sectors: ["Tailoring", "Bakery"], // Can add "Pottery", "Candle Making", "Soap Making"
  };

  // Sample stats
  const stats = {
    batches: { running: 8, upcoming: 3 },
    trainees: { enrolled: 186, active: 142 },
    attendance: { average: 91, vsLast: "+3" },
    assessments: { pending: 3, dueThisWeek: 3 },
  };

  // Sample tasks
  const tasks = [
    { id: 1, priority: "high", title: "Mark attendance for BATCH-TAI-001", details: "Day 5 of 12 | 28 trainees", action: "Mark Now" },
    { id: 2, priority: "high", title: "Mark attendance for BATCH-BAK-003", details: "Day 8 of 12 | 24 trainees", action: "Mark Now" },
    { id: 3, priority: "medium", title: "Upload Day 4 photos for BATCH-TAI-001", details: "Photos not yet uploaded for yesterday", action: "Upload" },
    { id: 4, priority: "medium", title: "Assessment due for BATCH-TAI-002", details: "Training completed | Results pending", action: "Submit" },
    { id: 5, priority: "low", title: "New batch approval: BATCH-BAK-004", details: "Approved by DKVIB on 13 Jun 2026", action: "View" },
  ];

  // Sample running batches
  const runningBatches = [
    { code: "BATCH-TAI-001", sector: "Tailoring", day: 5, totalDays: 12, trainees: 28, trainer: "Ramesh Kumar", start: "10 Jun", end: "21 Jun", attendanceMarked: true, photosUploaded: false },
    { code: "BATCH-BAK-003", sector: "Bakery", day: 8, totalDays: 12, trainees: 24, trainer: "Sunita Verma", start: "07 Jun", end: "18 Jun", attendanceMarked: false, photosUploaded: true },
  ];

  // Sector data
  const sectorData = {
    Bakery: {
      activeBatches: 3,
      trainees: 72,
      avgAtt: "89%",
      products: 14,
      curriculum: [
        "Day 1-3: Bread & basic dough techniques",
        "Day 4-5: Cakes and pastries",
        "Day 6-7: Indian sweets and mithai",
        "Day 8-9: Cookies and biscuits",
        "Day 10: Packaging and presentation",
        "Day 11: Costing and pricing products",
        "Day 12: Final practical + assessment",
      ],
      today: "Day 6-7: Indian sweets and mithai",
      productsList: [
        { name: "Wheat Bread", by: "Anita G.", price: "₹80", status: "Published", emoji: "🍞" },
        { name: "Layer Cake", by: "Priya M.", price: "₹450", status: "Pending", emoji: "🎂" },
        { name: "Butter Cookies", by: "", price: "₹120", status: "Published", emoji: "🍪" },
      ],
      equipment: [
        { name: "Oven (2 units)", ok: true },
        { name: "Mixer / Blender (3 units)", ok: true },
        { name: "Baking trays (20 sets)", ok: true },
        { name: "Measuring equipment", ok: true },
        { name: "Refrigerator", ok: false },
      ],
      materials: [
        "Flour:        25 kg/week",
        "Sugar:        10 kg/week",
        "Butter:       5 kg/week",
        "Eggs:         10 dozen/week",
        "Yeast:        500 gm/week",
      ],
    },
    Tailoring: {
      activeBatches: 4,
      trainees: 96,
      avgAtt: "93%",
      machinesWorking: "18/20",
      curriculum: [
        "Day 1-2: Basic stitching and tools introduction",
        "Day 3-4: Taking measurements and cutting fabric",
        "Day 5-6: Stitching salwar and simple garments",
        "Day 7-8: Blouse and kurta stitching",
        "Day 9-10: Embroidery and finishing touches",
        "Day 11: Alterations and repairs",
        "Day 12: Final product + assessment",
      ],
      today: "Day 7-8: Blouse and kurta stitching",
      productsList: [
        { name: "Embroidered Kurta", by: "", price: "₹850", status: "Published", emoji: "👗" },
        { name: "Cotton Blouse", by: "", price: "₹400", status: "Published", emoji: "👚" },
        { name: "Tote Bag", by: "", price: "₹180", status: "Pending", emoji: "👜" },
      ],
      machines: {
        total: 20,
        working: 18,
        underRepair: 2,
        materials: [
          { item: "Cotton fabric", status: "15 meters remaining", low: true },
          { item: "Thread (colors)", status: "Good stock", low: false },
          { item: "Buttons & hooks", status: "Good stock", low: false },
          { item: "Scissors sets", status: "10 available", low: false },
        ],
      },
    },
    Pottery: {
      activeBatches: 2,
      trainees: 44,
      avgAtt: "87%",
      kilnStatus: "✅",
      curriculum: [
        "Day 1-2: Introduction to clay and tools",
        "Day 3-4: Hand building techniques",
        "Day 5-6: Potter's wheel basics",
        "Day 7-8: Shaping bowls and vases",
        "Day 9-10: Drying and kiln firing",
        "Day 11: Glazing and decoration",
        "Day 12: Final product + assessment",
      ],
      today: "Day 5-6: Potter's wheel basics",
      productsList: [
        { name: "Clay Pot", by: "Pooja S.", price: "₹200", status: "Published", emoji: "🏺" },
        { name: "Storage Jar", by: "Meena K.", price: "₹350", status: "Published", emoji: "🫙" },
        { name: "Plant Pot", by: "Rekha J.", price: "₹150", status: "Pending", emoji: "🪴" },
      ],
      kiln: {
        temperature: "900°C",
        items: "32 pieces (Batch POT-002)",
        remainingTime: "8 hours remaining",
        nextAvailable: "15 Jun 2026 06:00 AM",
      },
      materials: [
        { item: "Red clay", status: "50 kg available", low: false },
        { item: "White clay", status: "20 kg available", low: false },
        { item: "Glazing mix", status: "5 kg available", low: true },
        { item: "Tools set", status: "15 complete sets", low: false },
      ],
    },
    "Candle Making": {
      activeBatches: 2,
      trainees: 48,
      avgAtt: "92%",
      products: 18,
      curriculum: [
        "Day 1-2: Types of candles and raw materials",
        "Day 3-4: Wax melting and mould preparation",
        "Day 5-6: Scented and decorative candles",
        "Day 7-8: Diya and festive candles",
        "Day 9-10: Packaging and branding",
        "Day 11: Pricing and selling techniques",
        "Day 12: Final product + assessment",
      ],
      today: "Day 7-8: Diya and festive candles",
      productsList: [
        { name: "Scented Set", by: "Riya S.", price: "₹250", status: "Published", emoji: "🕯" },
        { name: "Diya Pack", by: "Kavita Y.", price: "₹180", status: "Published", emoji: "🪔" },
        { name: "Pillar Candle", by: "", price: "₹120", status: "Pending", emoji: "🕯" },
      ],
      materials: [
        { item: "Paraffin wax", status: "10 kg", low: false },
        { item: "Soy wax", status: "5 kg", low: true },
        { item: "Wicks", status: "200 units", low: false },
        { item: "Fragrance oils", status: "8 types", low: false },
        { item: "Moulds", status: "25 sets", low: false },
        { item: "Color dyes", status: "12 colors", low: false },
        { item: "Packaging boxes", status: "50 units", low: true },
      ],
      safetyChecklist: [
        "Fire extinguisher available",
        "Safety gloves for all trainees",
        "Proper ventilation in workroom",
        "First aid kit — needs restocking",
      ],
    },
    "Soap Making": {
      curriculum: [
        "Day 1-2: Types of soaps and ingredients",
        "Day 3-4: Cold process soap making",
        "Day 5-6: Herbal and medicated soaps",
        "Day 7-8: Liquid soap and shampoo bars",
        "Day 9-10: Natural colors and fragrances",
        "Day 11: Packaging, labelling, branding",
        "Day 12: Final product + assessment",
      ],
      today: "Day 5-6: Herbal and medicated soaps",
      productsList: [
        { name: "Lavender Soap", by: "", price: "₹100", status: "Published", emoji: "🧼" },
        { name: "Neem Soap", by: "", price: "₹90", status: "Published", emoji: "🧴" },
        { name: "Rose Petal Soap", by: "", price: "₹120", status: "Pending", emoji: "🌿" },
      ],
      materials: [
        { item: "Coconut oil", status: "5 liters", low: false },
        { item: "Caustic soda", status: "2 kg", low: true },
        { item: "Essential oils", status: "10 types", low: false },
        { item: "Herbs & flowers", status: "8 types", low: false },
        { item: "Moulds", status: "30 units", low: false },
        { item: "Packaging", status: "40 units", low: false },
      ],
      safetyChecklist: [
        "Safety goggles for caustic soda handling",
        "Gloves available for all trainees",
        "Proper ventilation",
        "Emergency water supply for burns",
      ],
    },
  };

  // Helper functions
  const getPriorityStyle = (priority) => {
    if (priority === "high") return "border-red-500 text-red-800 bg-red-50";
    if (priority === "medium") return "border-yellow-500 text-yellow-800 bg-yellow-50";
    return "border-green-500 text-green-800 bg-green-50";
  };

  const getPriorityIcon = (priority) => {
    if (priority === "high") return "🔴";
    if (priority === "medium") return "🟡";
    return "🟢";
  };

  const getSectorEmoji = (sector) => {
    if (sector === "Tailoring") return "🧵";
    if (sector === "Bakery") return "🍞";
    if (sector === "Pottery") return "🏺";
    if (sector === "Candle Making") return "🕯";
    if (sector === "Soap Making") return "🧼";
    return "";
  };

  const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A2240] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 mx-auto">
            {getInitials(agencyData.name)}
          </div>
          <h3 className="text-lg font-bold text-center">{agencyData.name}</h3>
          <p className="text-blue-300 text-sm text-center">{agencyData.code}</p>
          <p className="text-green-400 text-sm text-center mt-1">✅ Approved</p>
          <div className="mt-4 pt-4 border-t border-gray-600">
            <p className="text-gray-400 text-sm mb-2 font-bold">Sectors:</p>
            {agencyData.sectors.map((sector) => (
              <p key={sector} className="text-sm text-gray-300 flex items-center gap-2">
                {getSectorEmoji(sector)} {sector}
              </p>
            ))}
          </div>
        </div>

        <nav className="flex-1 py-4">
          {[
            { id: "dashboard", icon: "🏠", label: "Dashboard" },
            { id: "profile", icon: "👤", label: "Agency Profile" },
            { id: "batches", icon: "📅", label: "My Batches" },
            { id: "create-batch", icon: "➕", label: "Create Batch" },
            { id: "attendance", icon: "✅", label: "Attendance" },
            { id: "assessment", icon: "📝", label: "Assessment" },
            { id: "photos", icon: "📸", label: "Photos" },
            { id: "products", icon: "🛍", label: "Products" },
            { id: "reports", icon: "📊", label: "My Reports" },
            { id: "notifications", icon: "🔔", label: "Notifications" },
            { id: "password", icon: "🔒", label: "Change Pass" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-800 transition-all ${
                activeTab === item.id ? "border-l-4 border-[#FF6B00] text-[#FF6B00] bg-gray-800" : "text-gray-300"
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
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              navigate("/");
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
                <h2 className="text-xl font-bold text-gray-900">DKKVY Portal</h2>
                <p className="text-sm text-gray-600">
                  {agencyData.name}  {agencyData.code}  ✅ Approved
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-700 hover:text-gray-900">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">हिंदी</button>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-all"
              >
                {getInitials(agencyData.name)}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-bold text-gray-900">{agencyData.name}</p>
                    <p className="text-sm text-gray-500">{agencyData.code}</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mt-1">
                      ✅ Approved
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">👤</span>
                    <span className="font-medium text-gray-900">Agency Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      localStorage.removeItem("user");
                      localStorage.removeItem("accessToken");
                      navigate("/");
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
          {/* Welcome Banner */}
          <section className="bg-gradient-to-r from-[#0A2240] to-[#FF6B00] p-8 rounded-2xl shadow-lg text-white">
            <h2 className="text-3xl font-extrabold mb-3">👋 Welcome, {agencyData.name}</h2>
            <div className="flex flex-wrap gap-4 text-lg mb-4">
              <p>Agency Code: <span className="font-bold">{agencyData.code}</span></p>
              <span>|</span>
              <p>Approved: <span className="font-semibold">{agencyData.approvalDate}</span></p>
            </div>
            <div className="flex flex-wrap gap-4 text-lg mb-4">
              <p>Sectors: {agencyData.sectors.map((s) => (
                <span key={s} className="mr-2">
                  {getSectorEmoji(s)} {s}
                </span>
              ))}</p>
            </div>
            <p className="text-lg mb-6">Contact: {agencyData.contactName} | {agencyData.contactMobile}</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#0A2240] transition-all">
                📋 View Profile
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#0A2240] transition-all">
                📞 Contact DKVIB
              </button>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <p className="text-sm opacity-90 mb-1">BATCHES</p>
                <p className="text-5xl font-extrabold">{stats.batches.running}</p>
                <p className="text-lg mt-2">Running</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{stats.batches.upcoming} upcoming</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <p className="text-sm opacity-90 mb-1">TRAINEES</p>
                <p className="text-5xl font-extrabold">{stats.trainees.enrolled}</p>
                <p className="text-lg mt-2">Enrolled</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{stats.trainees.active} active</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <p className="text-sm opacity-90 mb-1">ATTENDANCE</p>
                <p className="text-5xl font-extrabold">{stats.attendance.average}%</p>
                <p className="text-lg mt-2">Average</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{stats.attendance.vsLast} vs last month</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <p className="text-sm opacity-90 mb-1">ASSESSMENTS</p>
                <p className="text-5xl font-extrabold">{stats.assessments.pending}</p>
                <p className="text-lg mt-2">Pending</p>
              </div>
              <div className="p-4">
                <p className="text-gray-700">Due this week</p>
              </div>
            </div>
          </section>

          {/* Today's Tasks */}
          <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                ⚡ Today's Tasks
              </h3>
              <p className="text-gray-600 font-semibold">14 Jun 2026</p>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border-l-4 ${getPriorityStyle(task.priority)} flex items-center justify-between`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getPriorityIcon(task.priority)}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-600">{task.details}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#FF6B00] text-white font-bold rounded-lg hover:bg-orange-700 transition-all">
                    {task.action} →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Running Batches */}
          <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                📅 Running Batches
              </h3>
              <button className="text-[#FF6B00] font-bold hover:text-orange-700">
                View All →
              </button>
            </div>
            <div className="space-y-6">
              {runningBatches.map((batch) => (
                <div key={batch.code} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {batch.code}  {getSectorEmoji(batch.sector)} {batch.sector}
                      </h4>
                      <p className="text-gray-600">
                        {batch.trainees} trainees | Trainer: {batch.trainer}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {batch.start} – {batch.end} 2026
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Day {batch.day}/{batch.totalDays}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {Math.round((batch.day / batch.totalDays) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6B00] to-[#D4A017]"
                        style={{ width: `${(batch.day / batch.totalDays) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-700 mb-4">
                    <span>
                      Attendance today: {batch.attendanceMarked ? "✅ Marked" : "❌ Not Marked"}
                    </span>
                    <span>|</span>
                    <span>Photos: {batch.photosUploaded ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#FF6B00] text-[#FF6B00] font-semibold rounded-lg hover:bg-[#FF6B00] hover:text-white transition-all">
                      Attendance
                    </button>
                    <button className="px-4 py-2 border border-[#FF6B00] text-[#FF6B00] font-semibold rounded-lg hover:bg-[#FF6B00] hover:text-white transition-all">
                      Photos
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all">
                      Roster
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sector Tabs */}
          {agencyData.sectors.length > 1 && (
            <section className="flex gap-3 bg-white p-2 rounded-xl shadow border border-gray-200">
              {agencyData.sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                  className={`px-6 py-3 font-bold rounded-lg transition-all ${
                    activeSector === sector || (!activeSector && sector === agencyData.sectors[0])
                      ? "bg-[#FF6B00] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {getSectorEmoji(sector)} {sector}
                </button>
              ))}
            </section>
          )}

          {/* Sector Specific Sections */}
          {/* BAKERY SECTION */}
          {(agencyData.sectors.includes("Bakery") && (!activeSector || activeSector === "Bakery")) && (
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🍞 BAKERY TRAINING OVERVIEW</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-sm font-bold text-orange-800 mb-1">Active Batches</p>
                  <p className="text-4xl font-extrabold text-orange-900">{sectorData.Bakery.activeBatches}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-sm font-bold text-orange-800 mb-1">Trainees Enrolled</p>
                  <p className="text-4xl font-extrabold text-orange-900">{sectorData.Bakery.trainees}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-sm font-bold text-orange-800 mb-1">Avg Attendance</p>
                  <p className="text-4xl font-extrabold text-orange-900">{sectorData.Bakery.avgAtt}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-sm font-bold text-orange-800 mb-1">Products Uploaded</p>
                  <p className="text-4xl font-extrabold text-orange-900">{sectorData.Bakery.products}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">BAKERY CURRICULUM TRACKER</h4>
                <p className="text-gray-700 mb-4">What trainees are learning today</p>
                <div className="space-y-2">
                  {sectorData.Bakery.curriculum.map((item, idx) => (
                    <p
                      key={idx}
                      className={`p-3 rounded-lg ${item === sectorData.Bakery.today ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900 font-semibold" : "bg-gray-50"}`}
                    >
                      {item === sectorData.Bakery.today ? `${item} ← TODAY` : item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">BAKERY PRODUCTS IN e-CATALOGUE</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {sectorData.Bakery.productsList.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-orange-100 to-yellow-100 flex items-center justify-center text-6xl">
                        {product.emoji}
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">{product.name}</p>
                        {product.by && <p className="text-sm text-gray-600 mb-1">by {product.by}</p>}
                        <p className="text-2xl font-extrabold text-[#FF6B00] mb-2">{product.price}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status === "Published" ? "✅ Published" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  + Upload Bakery Product
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">BAKERY EQUIPMENT CHECKLIST</h4>
                <p className="text-gray-600 text-sm mb-4">(confirm available before each batch)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {sectorData.Bakery.equipment.map((equip, idx) => (
                    <p key={idx} className="flex items-center gap-3 text-lg text-gray-700">
                      <span>{equip.ok ? "✅" : "❌"}</span>
                      {equip.name}
                    </p>
                  ))}
                </div>
                <button className="text-yellow-600 font-bold hover:text-yellow-800">
                  ⚠️ Report missing equipment
                </button>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">RAW MATERIAL REQUIREMENT</h4>
                <p className="text-gray-600 text-sm mb-4">Estimate for current running batch</p>
                <div className="space-y-2 mb-4">
                  {sectorData.Bakery.materials.map((mat, idx) => (
                    <p key={idx} className="text-lg text-gray-700 font-mono">{mat}</p>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  📋 Generate Material List
                </button>
              </div>
            </section>
          )}

          {/* TAILORING SECTION */}
          {(agencyData.sectors.includes("Tailoring") && (!activeSector || activeSector === "Tailoring")) && (
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧵 TAILORING TRAINING OVERVIEW</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <p className="text-sm font-bold text-purple-800 mb-1">Active Batches</p>
                  <p className="text-4xl font-extrabold text-purple-900">{sectorData.Tailoring.activeBatches}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <p className="text-sm font-bold text-purple-800 mb-1">Trainees Enrolled</p>
                  <p className="text-4xl font-extrabold text-purple-900">{sectorData.Tailoring.trainees}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <p className="text-sm font-bold text-purple-800 mb-1">Avg Attendance</p>
                  <p className="text-4xl font-extrabold text-purple-900">{sectorData.Tailoring.avgAtt}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <p className="text-sm font-bold text-purple-800 mb-1">Machines Working</p>
                  <p className="text-4xl font-extrabold text-purple-900">{sectorData.Tailoring.machinesWorking}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">TAILORING CURRICULUM TRACKER</h4>
                <div className="space-y-2">
                  {sectorData.Tailoring.curriculum.map((item, idx) => (
                    <p
                      key={idx}
                      className={`p-3 rounded-lg ${item === sectorData.Tailoring.today ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900 font-semibold" : "bg-gray-50"}`}
                    >
                      {item === sectorData.Tailoring.today ? `${item} ← TODAY` : item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">SEWING MACHINE STATUS</h4>
                <div className="mb-4">
                  <p className="text-lg text-gray-700 mb-2">Total Machines: {sectorData.Tailoring.machines.total}</p>
                  <p className="text-lg text-gray-700 mb-2">Working: {sectorData.Tailoring.machines.working} ✅</p>
                  <p className="text-lg text-gray-700">Under Repair: {sectorData.Tailoring.machines.underRepair} ⚠️ Report to DKVIB</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Machine Usage Today:</p>
                  <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6B00] to-[#D4A017]"
                      style={{ width: `${(sectorData.Tailoring.machines.working / sectorData.Tailoring.machines.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {sectorData.Tailoring.machines.working}/{sectorData.Tailoring.machines.total} in use
                  </p>
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  🔧 Report Machine Issue
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">FABRIC & MATERIAL TRACKER</h4>
                <div className="space-y-3 mb-4">
                  {sectorData.Tailoring.machines.materials.map((mat, idx) => (
                    <p key={idx} className={`text-lg text-gray-700 flex items-center justify-between`}>
                      <span>{mat.item}</span>
                      <span className={mat.low ? "text-yellow-600 font-semibold" : "text-green-600"}>
                        {mat.status} {mat.low ? "⚠️ Low stock" : "✅"}
                      </span>
                    </p>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  📋 Request Materials
                </button>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">TAILORING PRODUCTS IN e-CATALOGUE</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {sectorData.Tailoring.productsList.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-6xl">
                        {product.emoji}
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">{product.name}</p>
                        {product.by && <p className="text-sm text-gray-600 mb-1">by {product.by}</p>}
                        <p className="text-2xl font-extrabold text-[#FF6B00] mb-2">{product.price}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status === "Published" ? "✅ Published" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  + Upload Tailoring Product
                </button>
              </div>
            </section>
          )}

          {/* POTTERY SECTION */}
          {(agencyData.sectors.includes("Pottery") && (!activeSector || activeSector === "Pottery")) && (
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🏺 POTTERY TRAINING OVERVIEW</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <p className="text-sm font-bold text-amber-800 mb-1">Active Batches</p>
                  <p className="text-4xl font-extrabold text-amber-900">{sectorData.Pottery.activeBatches}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <p className="text-sm font-bold text-amber-800 mb-1">Trainees Enrolled</p>
                  <p className="text-4xl font-extrabold text-amber-900">{sectorData.Pottery.trainees}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <p className="text-sm font-bold text-amber-800 mb-1">Avg Attendance</p>
                  <p className="text-4xl font-extrabold text-amber-900">{sectorData.Pottery.avgAtt}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <p className="text-sm font-bold text-amber-800 mb-1">Kiln Status</p>
                  <p className="text-4xl font-extrabold text-amber-900">{sectorData.Pottery.kilnStatus}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">POTTERY CURRICULUM TRACKER</h4>
                <div className="space-y-2">
                  {sectorData.Pottery.curriculum.map((item, idx) => (
                    <p
                      key={idx}
                      className={`p-3 rounded-lg ${item === sectorData.Pottery.today ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900 font-semibold" : "bg-gray-50"}`}
                    >
                      {item === sectorData.Pottery.today ? `${item} ← TODAY` : item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">KILN STATUS</h4>
                <div className="mb-4 space-y-2">
                  <p className="text-lg text-gray-700">Current temperature:  <span className="font-bold">{sectorData.Pottery.kiln.temperature}</span>  ✅ Normal</p>
                  <p className="text-lg text-gray-700">Items in kiln:        <span className="font-bold">{sectorData.Pottery.kiln.items}</span></p>
                  <p className="text-lg text-gray-700">Firing cycle:         <span className="font-bold">{sectorData.Pottery.kiln.remainingTime}</span></p>
                  <p className="text-lg text-gray-700">Next available:       <span className="font-bold">{sectorData.Pottery.kiln.nextAvailable}</span></p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">CLAY & MATERIAL STOCK</h4>
                <div className="space-y-3 mb-4">
                  {sectorData.Pottery.materials.map((mat, idx) => (
                    <p key={idx} className={`text-lg text-gray-700 flex items-center justify-between`}>
                      <span>{mat.item}</span>
                      <span className={mat.low ? "text-yellow-600 font-semibold" : "text-green-600"}>
                        {mat.status} {mat.low ? "⚠️ Low stock" : "✅ Good"}
                      </span>
                    </p>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  📋 Request Glazing Material
                </button>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">POTTERY PRODUCTS IN e-CATALOGUE</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {sectorData.Pottery.productsList.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center text-6xl">
                        {product.emoji}
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">{product.name}</p>
                        {product.by && <p className="text-sm text-gray-600 mb-1">by {product.by}</p>}
                        <p className="text-2xl font-extrabold text-[#FF6B00] mb-2">{product.price}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status === "Published" ? "✅ Published" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  + Upload Pottery Product
                </button>
              </div>
            </section>
          )}

          {/* CANDLE MAKING SECTION */}
          {(agencyData.sectors.includes("Candle Making") && (!activeSector || activeSector === "Candle Making")) && (
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🕯 CANDLE MAKING TRAINING OVERVIEW</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Active Batches</p>
                  <p className="text-4xl font-extrabold text-yellow-900">{sectorData["Candle Making"].activeBatches}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Trainees Enrolled</p>
                  <p className="text-4xl font-extrabold text-yellow-900">{sectorData["Candle Making"].trainees}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Avg Attendance</p>
                  <p className="text-4xl font-extrabold text-yellow-900">{sectorData["Candle Making"].avgAtt}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Products Uploaded</p>
                  <p className="text-4xl font-extrabold text-yellow-900">{sectorData["Candle Making"].products}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">CANDLE MAKING CURRICULUM TRACKER</h4>
                <div className="space-y-2">
                  {sectorData["Candle Making"].curriculum.map((item, idx) => (
                    <p
                      key={idx}
                      className={`p-3 rounded-lg ${item === sectorData["Candle Making"].today ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900 font-semibold" : "bg-gray-50"}`}
                    >
                      {item === sectorData["Candle Making"].today ? `${item} ← TODAY` : item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">RAW MATERIAL STOCK</h4>
                <div className="space-y-3 mb-4">
                  {sectorData["Candle Making"].materials.map((mat, idx) => (
                    <p key={idx} className={`text-lg text-gray-700 flex items-center justify-between`}>
                      <span>{mat.item}</span>
                      <span className={mat.low ? "text-yellow-600 font-semibold" : "text-green-600"}>
                        {mat.status} {mat.low ? "⚠️ Low stock" : "✅ Good"}
                      </span>
                    </p>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  📋 Request Materials
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">SAFETY CHECKLIST</h4>
                <p className="text-gray-600 text-sm mb-4">(must verify before each session)</p>
                <div className="space-y-2">
                  {sectorData["Candle Making"].safetyChecklist.map((item, idx) => (
                    <p key={idx} className="flex items-center gap-3 text-lg text-gray-700">
                      <span>{idx < 3 ? "✅" : "❌"}</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">CANDLE PRODUCTS IN e-CATALOGUE</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {sectorData["Candle Making"].productsList.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
                        {product.emoji}
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">{product.name}</p>
                        {product.by && <p className="text-sm text-gray-600 mb-1">by {product.by}</p>}
                        <p className="text-2xl font-extrabold text-[#FF6B00] mb-2">{product.price}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status === "Published" ? "✅ Published" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-700 transition-all">
                  + Upload Candle Product
                </button>
              </div>
            </section>
          )}

          {/* SOAP MAKING SECTION */}
          {(agencyData.sectors.includes("Soap Making") && (!activeSector || activeSector === "Soap Making")) && (
            <section className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧼 SOAP MAKING TRAINING OVERVIEW</h3>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">SOAP MAKING CURRICULUM TRACKER</h4>
                <div className="space-y-2">
                  {sectorData["Soap Making"].curriculum.map((item, idx) => (
                    <p
                      key={idx}
                      className={`p-3 rounded-lg ${item === sectorData["Soap Making"].today ? "bg-yellow-100 border-2 border-yellow-400 text-yellow-900 font-semibold" : "bg-gray-50"}`}
                    >
                      {item === sectorData["Soap Making"].today ? `${item} ← TODAY` : item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">RAW MATERIAL STOCK</h4>
                <div className="space-y-3 mb-4">
                  {sectorData["Soap Making"].materials.map((mat, idx) => (
                    <p key={idx} className={`text-lg text-gray-700 flex items-center justify-between`}>
                      <span>{mat.item}</span>
                      <span className={mat.low ? "text-yellow-600 font-semibold" : "text-green-600"}>
                        {mat.status} {mat.low ? "⚠️ Low — order needed" : "✅ Good"}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">SAFETY CHECKLIST</h4>
                <div className="space-y-2">
                  {sectorData["Soap Making"].safetyChecklist.map((item, idx) => (
                    <p key={idx} className="flex items-center gap-3 text-lg text-gray-700">
                      <span>✅</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">SOAP PRODUCTS IN e-CATALOGUE</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {sectorData["Soap Making"].productsList.map((product, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="h-32 bg-gradient-to-r from-green-100 to-teal-100 flex items-center justify-center text-6xl">
                        {product.emoji}
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-bold text-gray-900 mb-1">{product.name}</p>
                        {product.by && <p className="text-sm text-gray-600 mb-1">by {product.by}</p>}
                        <p className="text-2xl font-extrabold text-[#FF6B00] mb-2">{product.price}</p>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {product.status === "Published" ? "✅ Published" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgencyDashboard;

