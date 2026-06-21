
// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Saffron Strip (Tricolor Accent) */}
      <div className="h-1 bg-gradient-to-r from-[#FF6B00] via-white to-[#138808]"></div>

      {/* Top Navigation Bar */}
      <header className="bg-[#0A2240] text-white sticky top-0 z-50 shadow-2xl">
        {/* Top Strip with Logo & Info */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/50">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏛️</div>
            <div>
              <h1 className="text-2xl font-bold">DKKVY Portal</h1>
              <p className="text-xs text-blue-200">Delhi Khadi &amp; Village Industries Board</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-blue-100">📞 Helpline: 1800-123-4567</div>
            <button className="text-sm px-3 py-1 border border-white/30 rounded hover:bg-white/10 transition">
              हिंदी / EN
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/" className="font-semibold hover:text-[#FF6B00] transition">Home</Link>
            <a href="#about" className="hover:text-[#FF6B00] transition">About</a>
            <a href="#sectors" className="hover:text-[#FF6B00] transition">Sectors</a>
            <a href="#catalogue" className="hover:text-[#FF6B00] transition">e-Catalogue</a>
            <a href="#notices" className="hover:text-[#FF6B00] transition">Notice Board</a>
            <a href="#verify" className="hover:text-[#FF6B00] transition">Verify Certificate</a>
            <Link to="/agency-registration" className="font-semibold hover:text-[#FF6B00] transition">Agency Registration</Link>
          </div>
          <Link
            to="/login"
            className="px-6 py-2 bg-[#FF6B00] font-bold rounded-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Login ▶
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0A2240] text-white py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-5">⭕</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              दिल्ली खादी कौशल विकास योजना
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#FF6B00]">
              Delhi Khadi Kaushal Vikas Yojna
            </h3>
            <p className="text-xl text-blue-100 mb-4 font-semibold">
              "Empowering Delhi's Artisans &amp; Skilled Workforce"
            </p>
            <div className="flex flex-wrap gap-4 mb-8 text-lg">
              <span className="px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                ✨ Free 12-Day Skill Training
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                💰 ₹400 Stipend + ₹100 food
              </span>
              <span className="px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                📜 Certificate by CM, Delhi
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                to="/applicant-registration"
                className="px-8 py-4 bg-[#FF6B00] font-bold text-xl rounded-xl hover:bg-orange-600 transition shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1"
              >
                Apply Now →
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-white font-bold text-xl rounded-xl hover:bg-white/10 transition"
              >
                Admin Login →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-blue-200">
              <a href="#" className="hover:text-white transition underline">📱 Download App</a>
              <a href="#verify" className="hover:text-white transition underline">🔍 Verify Certificate</a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-8xl md:text-9xl opacity-90">
              🧵
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="#stats" className="inline-block text-white/80 hover:text-white animate-bounce">
            Scroll Down ↓
          </a>
        </div>
      </section>

      {/* Live Stats Counter Strip */}
      <section id="stats" className="bg-[#FF6B00] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
            {[
              { icon: '👥', number: '4,382+', label: 'Applicants Enrolled' },
              { icon: '🏢', number: '18', label: 'Agencies Approved' },
              { icon: '📅', number: '34', label: 'Batches Running' },
              { icon: '🎓', number: '2,106', label: 'Certified Trained' },
              { icon: '🪡', number: '1,847+', label: 'Machines Distributed' },
              { icon: '₹', number: '38.4L+', label: 'Stipend Released' },
              { icon: '✅', number: '91%', label: 'Attendance Rate' }
            ].map((stat, i) => (
              <div key={i} className="p-4 border-l border-white/30 first:border-l-0">
                <div className="text-4xl md:text-5xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Scheme */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">About DKKVY</h3>
              <h4 className="text-xl text-gray-700 mb-6">
                Delhi Khadi Kaushal Vikas Yojna is a flagship skill development scheme
              </h4>
              <p className="text-gray-700 mb-6 leading-relaxed">
                by Government of NCT of Delhi under DKVIB. It aims to empower the youth and artisans
                of Delhi through free skill training, financial assistance, and market linkages.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  '✓ Free 12-Day Training',
                  '✓ ₹1,600 Stipend',
                  '✓ CM Certificate',
                  '✓ Sewing Machine',
                  '✓ Identity Card'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-lg">
                    <span className="text-[#138808] text-2xl">{item.charAt(0)}</span>
                    <span className="text-gray-800">{item.slice(2)}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block text-[#FF6B00] font-bold hover:text-orange-700 transition">
                Read More →
              </a>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 shadow-xl">
              <div className="text-8xl text-center mb-6">🏫</div>
              <p className="text-center text-gray-600 italic">
                "Training session in progress at DKKVY Center"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Sectors */}
      <section id="sectors" className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
            हमारे प्रशिक्षण क्षेत्र / Our Training Sectors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
            {[
              { icon: '🧵', name: 'Tailoring', count: '450+' },
              { icon: '🍞', name: 'Bakery', count: '320+' },
              { icon: '🕯️', name: 'Candle Making', count: '280+' },
              { icon: '🧼', name: 'Soap Making', count: '190+' },
              { icon: '🌸', name: 'Perfume Making', count: '160+' },
              { icon: '💇', name: 'Hair Stylist', count: '210+' },
              { icon: '💄', name: 'Makeup Artist', count: '170+' },
              { icon: '🏺', name: 'Pottery', count: '140+' },
              { icon: '🌿', name: 'Essential Oil', count: '120+' }
            ].map((sector, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer hover:border-[#FF6B00]"
              >
                <div className="text-5xl mb-4">{sector.icon}</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{sector.name}</h4>
                <p className="text-[#FF6B00] font-bold">{sector.count}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="px-8 py-3 border-2 border-[#FF6B00] text-[#FF6B00] font-bold rounded-xl hover:bg-[#FF6B00] hover:text-white transition">
              View All Sectors →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
            आवेदन कैसे करें / How to Apply
          </h3>
          <div className="grid md:grid-cols-5 gap-4 mt-10">
            {[
              { icon: '📝', title: 'Register Online', desc: 'Fill form with ID & bank' },
              { icon: '✅', title: 'Get Selected', desc: 'SMS alert with batch' },
              { icon: '🏫', title: 'Attend 12-Day', desc: '100% attendance required' },
              { icon: '📋', title: 'Clear Assessment', desc: 'Pass practical exam' },
              { icon: '🎓', title: 'Get Certificate', desc: '₹1,600 + CM Cert' }
            ].map((step, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-lg text-center border-t-4 border-[#FF6B00]">
                <div className="w-12 h-12 bg-[#FF6B00] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {i + 1}
                </div>
                <div className="text-4xl mb-3">{step.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* e-Catalogue Preview */}
      <section id="catalogue" className="py-16 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
            हस्तनिर्मित उत्पाद / Products by Our Trainees
          </h3>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              { icon: '🕯️', name: 'Handmade Candle Set', price: '₹250', maker: 'Riya S.' },
              { icon: '👗', name: 'Embroidered Kurta', price: '₹850', maker: 'Priya M.' },
              { icon: '🏺', name: 'Clay Pot', price: '₹200', maker: 'Pooja S.' },
              { icon: '🧼', name: 'Lavender Soap', price: '₹120', maker: 'Sunita D.' }
            ].map((product, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-2xl hover:-translate-y-1 transition-all">
                <div className="text-5xl mb-4">{product.icon}</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h4>
                <p className="text-[#FF6B00] font-bold text-xl mb-2">{product.price}</p>
                <p className="text-sm text-gray-600 mb-4">by {product.maker}</p>
                <button className="w-full px-4 py-2 bg-[#FF6B00] text-white font-bold rounded-lg hover:bg-orange-600 transition">
                  Order
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-lg">
              Browse Full Catalogue →
            </button>
          </div>
        </div>
      </section>

      {/* Notice Board & Updates */}
      <section id="notices" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Notice Board */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                📋 Notice Board
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'red', title: 'New batch starting', desc: '15 Jul — Tailoring' },
                  { type: 'yellow', title: 'Assessment schedule', desc: 'for BAK-003 batch' },
                  { type: 'green', title: 'Stipend released for', desc: 'Jun 2026 batch' },
                  { type: 'blue', title: 'New sectors added:', desc: 'Essential Oil Making' }
                ].map((notice, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                      notice.type === 'red' ? 'bg-red-500' :
                      notice.type === 'yellow' ? 'bg-yellow-500' :
                      notice.type === 'green' ? 'bg-green-600' : 'bg-blue-600'
                    }`}></div>
                    <div>
                      <p className="font-bold text-gray-900">{notice.title}</p>
                      <p className="text-sm text-gray-600">{notice.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a href="#" className="text-[#FF6B00] font-bold hover:text-orange-700 transition">
                  View All Notices →
                </a>
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                📱 Important Links
              </h3>
              <div className="space-y-3 mb-8">
                {[
                  { text: '▶ Apply Online', to: '/applicant-registration' },
                  { text: '▶ Check Application Status', to: '/login' },
                  { text: '▶ Verify Certificate', to: '#verify' },
                  { text: '▶ Download Admit Card', to: '#' },
                  { text: '▶ Agency Registration', to: '/agency-registration' }
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="block p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer transition">
                    <p className="font-semibold text-gray-900">{link.text}</p>
                  </Link>
                ))}
                <div className="p-3 bg-white rounded-lg border-l-4 border-[#FF6B00]">
                  <p className="font-semibold text-gray-900">📞 Helpline: 1800-123-4567</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                📥 Downloads
              </h3>
              <div className="space-y-2">
                {[
                  '▶ Scheme Guidelines PDF',
                  '▶ Application Form PDF',
                  '▶ Agency Registration Form'
                ].map((link, i) => (
                  <div key={i} className="p-2 hover:bg-gray-100 cursor-pointer rounded transition">
                    <p className="text-gray-700">{link}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Verification Bar */}
      <section id="verify" className="py-12 bg-[#0A2240] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3">
            🔍 Verify Your Certificate
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Enter Certificate Number: DKKVY-CERT-2026-_____"
              className="w-full md:w-96 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#FF6B00]/50"
            />
            <button className="px-8 py-4 bg-[#FF6B00] font-bold text-lg rounded-xl hover:bg-orange-600 transition shadow-lg">
              Verify Now →
            </button>
          </div>
          <p className="mt-4 text-blue-200">Or scan the QR code on your certificate</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2240] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Logos */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-4xl">
            <div>🏛️</div>
            <div>📊</div>
            <div>🎓</div>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">About</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition">About DKKVY</a></li>
                <li><a href="#" className="hover:text-white transition">About DKVIB</a></li>
                <li><a href="#" className="hover:text-white transition">Scheme FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">RTI</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/applicant-registration" className="hover:text-white transition">Apply Now</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Check Status</Link></li>
                <li><a href="#catalogue" className="hover:text-white transition">e-Catalogue</a></li>
                <li><a href="#verify" className="hover:text-white transition">Verify Cert</a></li>
                <li><Link to="/agency-registration" className="hover:text-white transition">Agency Login</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Admin Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Contact</h4>
              <p className="text-blue-200 mb-4">
                DKVIB Head Office<br />
                Address, Delhi
              </p>
              <p className="text-blue-200 mb-2">📞 1800-123-4567</p>
              <p className="text-blue-200 mb-4">📧 dkkvy@delhi.gov.in</p>
              <div className="flex gap-4 text-xl">
                <a href="#" className="hover:text-[#FF6B00] transition">🐦</a>
                <a href="#" className="hover:text-[#FF6B00] transition">📘</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-blue-200">
            <p className="mb-2">© 2026 Delhi Khadi &amp; Village Industries Board</p>
            <p className="mb-2">Government of National Capital Territory of Delhi</p>
            <p className="mb-2">Site designed &amp; developed by Anshita Agrawal</p>
            <p>Last updated: June 2026 | Visitors: 1,24,832</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
