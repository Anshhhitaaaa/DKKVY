
import { useNavigate } from 'react-router-dom';

const ApplicantProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#0A2240] text-white py-6 px-4 shadow-2xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/applicant-dashboard')}
              className="text-2xl hover:text-[#FF6B00] transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏛</div>
              <div>
                <h2 className="text-2xl font-bold">DKKVY Portal</h2>
                <p className="text-xs text-blue-200">My Profile</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-r from-[#FF6B00] to-[#D4A017] rounded-full flex items-center justify-center text-4xl font-bold text-white">
              RS
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Riya Sharma</h3>
              <p className="text-lg text-gray-600">Applicant ID: DKKVY202600143</p>
              <span className="inline-block mt-2 px-4 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                Approved
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-lg font-semibold text-gray-900">Riya Sharma</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Father's/Mother's Name</p>
              <p className="text-lg font-semibold text-gray-900">Sunita Sharma</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p className="text-lg font-semibold text-gray-900">15th March 1998</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="text-lg font-semibold text-gray-900">Female</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
              <p className="text-lg font-semibold text-gray-900">9876543210</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-lg font-semibold text-gray-900">riya@example.com</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-lg font-semibold text-gray-900">
                123, Main Road, Chandni Chowk, Delhi - 110006
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mb-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📄 ID & Bank Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">ID Proof Type</p>
                <p className="text-lg font-semibold text-gray-900">Aadhaar Card</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">ID Proof Number</p>
                <p className="text-lg font-semibold text-gray-900">XXXXXXXX9012</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                <p className="text-lg font-semibold text-gray-900">State Bank of India</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Number</p>
                <p className="text-lg font-semibold text-gray-900">XXXXXXXXXX1234</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">IFSC Code</p>
                <p className="text-lg font-semibold text-gray-900 font-mono">SBIN0001234</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🏫 Training Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Training Sector</p>
                <p className="text-lg font-semibold text-gray-900">Tailoring Trade</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Batch</p>
                <p className="text-lg font-semibold text-gray-900">TAI-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Training Agency</p>
                <p className="text-lg font-semibold text-gray-900">Skill India Foundation</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Training Period</p>
                <p className="text-lg font-semibold text-gray-900">10th June - 21st June 2026</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-3 bg-[#0A2240] text-white font-bold rounded-xl hover:bg-blue-900 transition-all">
              Edit Profile
            </button>
            <button className="px-8 py-3 border-2 border-[#0A2240] text-[#0A2240] font-bold rounded-xl hover:bg-gray-50 transition-all">
              Download Profile PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicantProfile;
