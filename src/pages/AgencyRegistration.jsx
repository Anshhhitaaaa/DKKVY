
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AgencyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedLoginId, setGeneratedLoginId] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Step 1
    orgName: '',
    orgType: '',
    yearEstablished: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    mobileNumber: '',
    alternateMobile: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    website: '',
    registeredOfficeAddress: '',
    district: '',
    pincode: '',
    trainingCentreAddress: '',
    sameAsRegisteredOffice: false,
    
    // Step 2
    registrationNumber: '',
    registrationDate: '',
    registeredUnder: '',
    panNumber: '',
    tanNumber: '',
    gstNumber: '',
    udyamNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    bankName: '',
    accountHolderName: '',
    branchName: '',
    empanelledWithNSDC: false,
    empanelledWithDKVIB: false,
    nsdcRegNumber: '',
    previousDKVIBWork: '',
    empanelledWithSkillIndia: false,
    blacklistingHistory: false,
    
    // Step 3
    trainingCentreOwnership: '',
    totalTrainingSpace: '',
    numberOfTrainingRooms: '',
    seatingCapacity: '',
    facilities: [],
    sectors: [],
    maxBatchesPerMonth: '',
    maxTraineesPerBatch: '',
    
    // Step 4
    trainers: [],
    totalYearsInTraining: '',
    totalTraineesTrained: '',
    previousProjects: '',
    achievements: '',
    
    // Step 5
    documents: {},
    declaration1: false,
    declaration2: false,
    declaration3: false,
    declaration4: false,
    authorizedSignatoryName: '',
    authorizedSignatoryDesignation: '',
    declarationDate: new Date().toISOString().split('T')[0],
  });

  const [trainers, setTrainers] = useState([{
    name: '',
    mobile: '',
    email: '',
    sector: '',
    qualification: '',
    experience: '',
    specialization: '',
    certifications: '',
    aadhaarNumber: '',
  }]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleSectorChange = (sector) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleTrainerChange = (index, e) => {
    const newTrainers = [...trainers];
    newTrainers[index][e.target.name] = e.target.value;
    setTrainers(newTrainers);
  };

  const addTrainer = () => {
    setTrainers([...trainers, {
      name: '',
      mobile: '',
      email: '',
      sector: '',
      qualification: '',
      experience: '',
      specialization: '',
      certifications: '',
      aadhaarNumber: '',
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { confirmPassword, sameAsRegisteredOffice, trainers, ...submitData } = formData;
      const response = await api.post('/auth/register/agency', {...submitData, trainers});
      setGeneratedLoginId(response.data.loginId);
      setCurrentStep(6);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-[#0A2240] hover:text-[#FF6B00] font-semibold flex items-center gap-2 mb-10">
          ← Back to Home
        </Link>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Legal Info' },
            { num: 3, label: 'Infrastructure' },
            { num: 4, label: 'Trainers' },
            { num: 5, label: 'Documents' },
            { num: 6, label: 'Success' },
          ].map((step, index) => (
            <div key={step.num} className="flex flex-col items-center flex-1 relative">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl transition-all ${
                step.num < currentStep
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : step.num === currentStep
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#D4A017] text-white shadow-xl scale-110'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.num < currentStep ? '✓' : step.num}
              </div>
              <span className={`text-sm font-semibold mt-3 ${
                step.num === currentStep ? 'text-[#FF6B00]' : 'text-gray-600'
              }`}>{step.label}</span>
              {index < totalSteps - 1 && (
                <div className={`absolute top-7 left-1/2 w-full h-1 ${
                  step.num < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} style={{ zIndex: -1 }}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
            Agency Registration Form
          </h2>

          {/* Step 1 - Basic Info & Contact */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A2240] mb-6 pb-3 border-b-2 border-[#FF6B00]">
                  Basic Information & Contact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Organization Name *</label>
                    <input
                      type="text"
                      name="orgName"
                      value={formData.orgName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="Enter full legal name of the organization"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Organization Type *</label>
                    <select
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="ngo">NGO / Trust</option>
                      <option value="pvt">Private Limited Company</option>
                      <option value="society">Society</option>
                      <option value="govt">Government Body</option>
                      <option value="prop">Proprietorship</option>
                      <option value="partnership">Partnership Firm</option>
                      <option value="sdi">Skill Development Institute</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Year of Establishment *</label>
                    <input
                      type="number"
                      name="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 2015"
                      required
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Contact Person Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Contact Person Name *</label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Designation *</label>
                    <input
                      type="text"
                      name="contactPersonDesignation"
                      value={formData.contactPersonDesignation}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="Director / Manager / CEO"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Alternate Mobile</label>
                    <input
                      type="tel"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Email ID *</label>
                    <input
                      type="email"
                      name="emailId"
                      value={formData.emailId}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
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
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
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
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Website (Optional)</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Address Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Registered Office Address *</label>
                    <textarea
                      name="registeredOfficeAddress"
                      value={formData.registeredOfficeAddress}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Training Centre Address *</label>
                    <textarea
                      name="trainingCentreAddress"
                      value={formData.sameAsRegisteredOffice ? formData.registeredOfficeAddress : formData.trainingCentreAddress}
                      onChange={handleChange}
                      disabled={formData.sameAsRegisteredOffice}
                      rows={3}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="sameAsRegisteredOffice"
                        checked={formData.sameAsRegisteredOffice}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#FF6B00]"
                      />
                      <span className="text-lg font-semibold text-gray-900">Same as registered office address</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-10 py-4 bg-gradient-to-r from-[#FF6B00] to-[#D4A017] text-white font-bold text-xl rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:-translate-y-1"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Legal & Registration Details */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A2240] mb-6 pb-3 border-b-2 border-[#FF6B00]">
                  Legal & Registration Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Registration / Incorporation Number *</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. CIN / Trust Reg No / Society Reg No"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Registration Date *</label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Registered Under *</label>
                    <select
                      name="registeredUnder"
                      value={formData.registeredUnder}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    >
                      <option value="">Select Act</option>
                      <option value="companies">Companies Act 2013</option>
                      <option value="societies">Societies Act</option>
                      <option value="trust">Trust Act</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">PAN Number *</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
                      placeholder="AAAAA0000A"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">TAN Number</label>
                    <input
                      type="text"
                      name="tanNumber"
                      value={formData.tanNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">UDYAM / MSME Number</label>
                    <input
                      type="text"
                      name="udyamNumber"
                      value={formData.udyamNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Bank Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Bank Account Number *</label>
                    <input
                      type="text"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
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
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Bank Name *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Branch Name</label>
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Account Holder Name *</label>
                    <input
                      type="text"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Government Empanelment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Empanelled with NSDC? *</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithNSDC"
                          value="true"
                          checked={formData.empanelledWithNSDC}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithNSDC: true }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithNSDC"
                          value="false"
                          checked={!formData.empanelledWithNSDC}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithNSDC: false }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Empanelled with DKVIB previously? *</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithDKVIB"
                          value="true"
                          checked={formData.empanelledWithDKVIB}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithDKVIB: true }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithDKVIB"
                          value="false"
                          checked={!formData.empanelledWithDKVIB}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithDKVIB: false }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">No</span>
                      </label>
                    </div>
                  </div>
                  {formData.empanelledWithNSDC && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-3">NSDC Registration Number</label>
                      <input
                        type="text"
                        name="nsdcRegNumber"
                        value={formData.nsdcRegNumber}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      />
                    </div>
                  )}
                  {formData.empanelledWithDKVIB && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 mb-3">Previous DKVIB Work Details</label>
                      <textarea
                        name="previousDKVIBWork"
                        value={formData.previousDKVIBWork}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                        placeholder="Year + project name"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Empanelled with Skill India?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithSkillIndia"
                          value="true"
                          checked={formData.empanelledWithSkillIndia}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithSkillIndia: true }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="empanelledWithSkillIndia"
                          value="false"
                          checked={!formData.empanelledWithSkillIndia}
                          onChange={() => setFormData(prev => ({ ...prev, empanelledWithSkillIndia: false }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">No</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Any Blacklisting History?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="blacklistingHistory"
                          value="true"
                          checked={formData.blacklistingHistory}
                          onChange={() => setFormData(prev => ({ ...prev, blacklistingHistory: true }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="blacklistingHistory"
                          value="false"
                          checked={!formData.blacklistingHistory}
                          onChange={() => setFormData(prev => ({ ...prev, blacklistingHistory: false }))}
                          className="w-5 h-5 accent-[#FF6B00]"
                        />
                        <span className="text-lg font-semibold text-gray-900">No</span>
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl">
                    <p className="text-yellow-900 font-semibold">
                      ⚠️ Note: If blacklisted by any government authority, application will be automatically rejected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-10 py-4 bg-gradient-to-r from-[#FF6B00] to-[#D4A017] text-white font-bold text-xl rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:-translate-y-1"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Infrastructure & Capacity */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A2240] mb-6 pb-3 border-b-2 border-[#FF6B00]">
                  Infrastructure & Capacity
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Training Centre Ownership *</label>
                    <div className="flex flex-wrap gap-6">
                      {['Own premises', 'Rented premises', 'Government provided space'].map(option => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="trainingCentreOwnership"
                            value={option}
                            checked={formData.trainingCentreOwnership === option}
                            onChange={() => setFormData(prev => ({ ...prev, trainingCentreOwnership: option }))}
                            className="w-5 h-5 accent-[#FF6B00]"
                          />
                          <span className="text-lg font-semibold text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Total Training Space (sq ft) *</label>
                    <input
                      type="number"
                      name="totalTrainingSpace"
                      value={formData.totalTrainingSpace}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 1200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Number of Training Rooms *</label>
                    <input
                      type="number"
                      name="numberOfTrainingRooms"
                      value={formData.numberOfTrainingRooms}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Seating Capacity per Batch *</label>
                    <input
                      type="number"
                      name="seatingCapacity"
                      value={formData.seatingCapacity}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 30 (minimum 10, maximum 50)"
                      required
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Available Facilities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    'Electricity supply', 'Drinking water facility', 'Separate washrooms for male / female',
                    'Proper ventilation and lighting', 'Fire safety equipment', 'First aid kit',
                    'CCTV cameras', 'Generator / Power backup', 'WiFi / Internet connection',
                    'Projector / Smart board', 'Library / Reference material', 'Canteen / Refreshment area',
                    'Ramp for differently abled persons'
                  ].map(facility => (
                    <label key={facility} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.facilities.includes(facility)}
                        onChange={() => handleFacilityChange(facility)}
                        className="w-5 h-5 accent-[#FF6B00]"
                      />
                      <span className="text-gray-800">{facility}</span>
                    </label>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Training Sectors Applying For</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    'Tailoring Trade / Sewing', 'Bakery', 'Perfume Making', 'Essential Oil Making',
                    'Candle Making', 'Soap Making', 'Hair Stylist', 'Makeup Artist', 'Pottery'
                  ].map(sector => (
                    <label key={sector} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sectors.includes(sector)}
                        onChange={() => handleSectorChange(sector)}
                        className="w-5 h-5 accent-[#FF6B00]"
                      />
                      <span className="text-gray-800">{sector}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Maximum Batches per Month *</label>
                    <input
                      type="number"
                      name="maxBatchesPerMonth"
                      value={formData.maxBatchesPerMonth}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 4"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Maximum Trainees per Batch *</label>
                    <input
                      type="number"
                      name="maxTraineesPerBatch"
                      value={formData.maxTraineesPerBatch}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="e.g. 30 (maximum allowed: 50)"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-10 py-4 bg-gradient-to-r from-[#FF6B00] to-[#D4A017] text-white font-bold text-xl rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:-translate-y-1"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 4 - Trainer Details */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A2240] mb-6 pb-3 border-b-2 border-[#FF6B00]">
                  Trainer Details
                </h3>
                
                <p className="text-gray-700 text-lg mb-8">Add at least 1 trainer for each sector applied for</p>
                
                {trainers.map((trainer, index) => (
                  <div key={index} className="p-8 bg-gray-50 rounded-2xl border border-gray-200 mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Trainer {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Trainer Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={trainer.name}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Mobile Number *</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={trainer.mobile}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={trainer.email}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Training Sector *</label>
                        <select
                          name="sector"
                          value={trainer.sector}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          required
                        >
                          <option value="">Select sector</option>
                          {formData.sectors.length > 0 ? formData.sectors.map(sector => (
                            <option key={sector} value={sector}>{sector}</option>
                          )) : (
                            <option value="">Select sectors in Step 3 first</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Highest Qualification *</label>
                        <select
                          name="qualification"
                          value={trainer.qualification}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          required
                        >
                          <option value="">Select qualification</option>
                          <option value="10th">10th</option>
                          <option value="12th">12th</option>
                          <option value="graduate">Graduate</option>
                          <option value="iti">ITI</option>
                          <option value="diploma">Diploma</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Years of Experience *</label>
                        <input
                          type="number"
                          name="experience"
                          value={trainer.experience}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          placeholder="e.g. 5"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Specialization</label>
                        <input
                          type="text"
                          name="specialization"
                          value={trainer.specialization}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          placeholder="e.g. Bridal wear, Pottery glazing"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Certifications / Awards</label>
                        <input
                          type="text"
                          name="certifications"
                          value={trainer.certifications}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                          placeholder="e.g. NTC, NAC, State award winner, National Craft Award"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Aadhaar Number *</label>
                        <input
                          type="text"
                          name="aadhaarNumber"
                          value={trainer.aadhaarNumber}
                          onChange={(e) => handleTrainerChange(index, e)}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg font-mono"
                          placeholder="XXXX-XXXX-XXXX"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addTrainer}
                  className="mb-8 px-6 py-3 border-2 border-[#FF6B00] text-[#FF6B00] font-bold rounded-xl hover:bg-[#FF6B00] hover:text-white transition-all"
                >
                  + Add Another Trainer
                </button>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Previous Training Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Total Years in Skill Training *</label>
                    <input
                      type="number"
                      name="totalYearsInTraining"
                      value={formData.totalYearsInTraining}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Total Trainees Trained So Far *</label>
                    <input
                      type="number"
                      name="totalTraineesTrained"
                      value={formData.totalTraineesTrained}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Previous Government Projects (last 3 years)</label>
                    <textarea
                      name="previousProjects"
                      value={formData.previousProjects}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="Mention scheme name, year, number of trainees trained, and outcome"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Notable Achievements / Awards</label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      placeholder="Any recognition received from state or central government"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-10 py-4 bg-gradient-to-r from-[#FF6B00] to-[#D4A017] text-white font-bold text-xl rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-800 transition-all transform hover:-translate-y-1"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 5 - Documents Upload & Submit */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#0A2240] mb-6 pb-3 border-b-2 border-[#FF6B00]">
                  Documents Upload & Submit
                </h3>
                
                <p className="text-gray-700 text-lg mb-8">All files in PDF or JPG format, maximum 2MB each</p>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Mandatory Documents</h4>
                <div className="space-y-6 mb-10">
                  {[
                    'Registration Certificate', 'PAN Card', 'Cancelled Cheque or Bank Statement',
                    'Address Proof of Training Centre', 'Photographs of Training Centre', 'Equipment and Inventory List',
                    'Trainer Qualification Certificates'
                  ].map(doc => (
                    <div key={doc} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl">
                      <span className="text-lg font-semibold text-gray-900">{doc} *</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg" className="text-lg" />
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Optional Documents</h4>
                <div className="space-y-6 mb-10">
                  {[
                    'NSDC / Skill India Empanelment Letter', 'Previous Training Completion Reports',
                    'ISO / Quality Certification', 'NOC from Building Owner'
                  ].map(doc => (
                    <div key={doc} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl">
                      <span className="text-lg font-semibold text-gray-900">{doc}</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg" className="text-lg" />
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-6 pt-4">Declaration</h4>
                <div className="space-y-4 mb-10">
                  {[
                    'I hereby declare that all information provided in this application is true and correct to the best of my knowledge.',
                    'I confirm that this organization has never been blacklisted by any government authority at state or central level.',
                    'I agree to abide by all DKVIB guidelines, norms and rules for conducting training under Delhi Khadi Kaushal Vikas Yojna.',
                    'I consent to inspection of the training centre by DKVIB officials at any time during the scheme period.'
                  ].map((decl, i) => (
                    <label key={i} className="flex items-start gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-6 h-6 accent-[#FF6B00] mt-1"
                        checked={formData[`declaration${i+1}`]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          [`declaration${i+1}`]: e.target.checked
                        }))}
                      />
                      <span className="text-gray-800 text-lg">{decl}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Authorized Signatory Name *</label>
                    <input
                      type="text"
                      name="authorizedSignatoryName"
                      value={formData.authorizedSignatoryName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Designation *</label>
                    <input
                      type="text"
                      name="authorizedSignatoryDesignation"
                      value={formData.authorizedSignatoryDesignation}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Date *</label>
                    <input
                      type="date"
                      name="declarationDate"
                      value={formData.declarationDate}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#FF6B00] focus:ring-4 focus:ring-orange-200 outline-none transition-all text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <label className="block text-sm font-bold text-gray-900 mb-3">Digital Signature or Stamp *</label>
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                    <input type="file" accept=".pdf,.jpg,.jpeg" className="text-lg" />
                    <p className="text-gray-600 mt-3">Upload signed declaration on organization letterhead</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-xl hover:bg-gray-50 transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-xl shadow-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
          {/* Step 6 - Success */}
          {currentStep === 6 && (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900">Your Agency Registration is Complete!</h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                <p className="text-lg text-gray-800 mb-2">Your Agency Login ID has been generated:</p>
                <div className="text-3xl font-extrabold text-blue-700 bg-white p-4 rounded-xl border-2 border-blue-300">
                  {generatedLoginId}
                </div>
                <p className="text-sm text-gray-600 mt-2">Save this ID - you'll need it to log in! After admin approves your agency, you can login!</p>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Go to Login →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyRegistration;
