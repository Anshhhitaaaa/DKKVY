
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const trainingSectors = [
  'Tailoring Trade / Sewing',
  'Bakery',
  'Perfume Making',
  'Essential Oil Making',
  'Candle Making',
  'Soap Making',
  'Hair Stylist',
  'Makeup Artist',
  'Pottery',
];

const ApplicantRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    fatherMotherName: '',
    dob: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    idProofType: '',
    idProofNumber: '',
    bankAccount: '',
    ifscCode: '',
    bankName: '',
    accountHolder: '',
    trainingSector: '',
    preferredAgency: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedLoginId, setGeneratedLoginId] = useState('');
  const navigate = useNavigate();

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (currentStep === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [currentStep, timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/send-otp', {
        email: formData.email,
        mobile: formData.mobile
      });
      alert(`OTP sent to ${formData.email} (Demo OTP: 123456)`);
      setCurrentStep(2);
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    try {
      const response = await api.post('/auth/verify-otp', {
        email: formData.email,
        otp: enteredOtp
      });
      setCurrentStep(3);
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP! Please enter 123456');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await api.post('/auth/send-otp', {
        email: formData.email,
        mobile: formData.mobile
      });
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      alert(`OTP resent to ${formData.email} (Demo OTP: 123456)`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      const response = await api.post('/auth/register/applicant', submitData);
      setGeneratedLoginId(response.data.loginId);
      setCurrentStep(5);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Personal Info' },
    { num: 2, label: 'OTP Verify' },
    { num: 3, label: 'ID & Bank' },
    { num: 4, label: 'Training' },
    { num: 5, label: 'Success' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-[#0A2240] hover:text-[#FF6B00] font-semibold flex items-center gap-2 mb-10">
          ← Back to Home
        </Link>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          {steps.map((step, index) => (
            <div key={step.num} className="flex flex-col items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                step.num < currentStep ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' :
                step.num === currentStep ? 'bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white shadow-xl scale-110' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step.num < currentStep ? '✓' : step.num}
              </div>
              <span className={`text-sm font-semibold ${
                step.num === currentStep ? 'text-[#FF6B00]' : 'text-gray-600'
              }`}>{step.label}</span>
              {index < steps.length - 1 && (
                <div className={`w-full h-1 mt-2 rounded-full ${
                  step.num < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
            {currentStep === 1 && 'Step 1 — Personal Information'}
            {currentStep === 2 && 'Step 2 — OTP Verification'}
            {currentStep === 3 && 'Step 3 — ID Proof & Bank Details'}
            {currentStep === 4 && 'Step 4 — Training Selection'}
            {currentStep === 5 && 'Registration Successful!'}
          </h2>

          {/* Step 5: Success */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900">Your Registration is Complete!</h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                <p className="text-lg text-gray-800 mb-2">Your Login ID has been generated:</p>
                <div className="text-3xl font-extrabold text-blue-700 bg-white p-4 rounded-xl border-2 border-blue-300">
                  {generatedLoginId}
                </div>
                <p className="text-sm text-gray-600 mt-2">Save this ID - you'll need it to log in!</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Go to Login →
              </button>
            </div>
          )}

          {/* Step 1: Personal Info Form */}
          {currentStep === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3">Father's/Mother's Name *</label>
                  <input
                    type="text"
                    name="fatherMotherName"
                    value={formData.fatherMotherName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter father's or mother's name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-3">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter 10-digit mobile number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white rounded-xl font-bold text-xl shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Send OTP →
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-8 text-center">
              <div className="text-lg text-gray-700">
                OTP sent to <span className="font-bold text-gray-900">{
                  formData.email ? formData.email.slice(0, 3) + 'XXX@' + formData.email.split('@')[1] : 'your email'
                }</span>
              </div>

              <div className="flex justify-center gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-14 h-16 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all"
                    maxLength={1}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="text-gray-600">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#FF6B00] font-bold hover:text-orange-700 transition"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p>Resend OTP in <span className="font-bold text-[#FF6B00]">{timer}</span> seconds</p>
                )}
              </div>

              <p className="text-sm text-gray-500">Demo OTP: 123456</p>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Verify OTP →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: ID & Bank Details */}
          {currentStep === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(4); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">ID Proof Type *</label>
                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    required
                  >
                    <option value="">Select ID Proof</option>
                    <option value="AADHAAR">Aadhaar Card</option>
                    <option value="PAN">PAN Card</option>
                    <option value="VOTER_ID">Voter ID</option>
                    <option value="DRIVING_LICENCE">Driving License</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">ID Proof Number *</label>
                  <input
                    type="text"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter ID proof number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Bank Account Number *</label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter bank account number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">IFSC Code *</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter IFSC code"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Bank name auto-fetched"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Account Holder Name *</label>
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    placeholder="Enter account holder name"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#FF6B00] to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Continue →
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Training Selection */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Training Sector *</label>
                  <select
                    name="trainingSector"
                    value={formData.trainingSector}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    required
                  >
                    <option value="">Select training sector</option>
                    {trainingSectors.map((sector, i) => (
                      <option key={i} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Preferred Agency (Optional)</label>
                  <select
                    name="preferredAgency"
                    value={formData.preferredAgency}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                  >
                    <option value="">Select preferred agency</option>
                    <option value="DKKVY Training Center - Connaught Place">DKKVY Training Center - Connaught Place</option>
                    <option value="DKKVY Training Center - Dwarka">DKKVY Training Center - Dwarka</option>
                    <option value="DKKVY Training Center - Rohini">DKKVY Training Center - Rohini</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-green-700 hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantRegistration;
