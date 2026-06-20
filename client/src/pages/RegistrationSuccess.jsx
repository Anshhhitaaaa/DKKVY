
import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-lg text-center">
        <div className="text-green-600 text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Application submitted successfully!
        </h2>
        <div className="bg-gray-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Your Applicant ID:</p>
          <p className="text-4xl font-bold text-[#0A2240] font-mono">
            DKKVY202600143
          </p>
        </div>
        <p className="text-gray-700 mb-8 text-lg">
          Save this ID for future reference
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/applicant-dashboard"
            className="px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Go to My Dashboard →
          </Link>
          <button className="px-8 py-4 border-2 border-[#FF6B00] text-[#FF6B00] rounded-xl font-bold text-lg hover:bg-[#FF6B00] hover:text-white transition-all">
            Download Acknowledgement PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
