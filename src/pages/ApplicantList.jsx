
// src/pages/ApplicantList.jsx
import AdminLayout from '../components/AdminLayout';
import { useSelector } from 'react-redux';

const ApplicantList = () => {
  const { applicants, loading, error } = useSelector((state) => state.applicants);

  if (loading) return <AdminLayout title="Applicants"><div className="text-center py-20 text-xl text-gray-700">Loading...</div></AdminLayout>;
  if (error) return <AdminLayout title="Applicants"><div className="text-center py-20 text-xl text-red-600">Error: {error}</div></AdminLayout>;

  return (
    <AdminLayout title="Applicants Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Applicant Management</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-900">Applicant ID</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-900">Name</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-900">Mobile</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-900">Training Sector</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-900">Application Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition-all">
                    <td className="py-5 px-6 text-sm text-gray-700 font-mono">{applicant.applicantId}</td>
                    <td className="py-5 px-6 text-sm font-semibold text-gray-900">{applicant.name}</td>
                    <td className="py-5 px-6 text-sm text-gray-700">{applicant.mobile}</td>
                    <td className="py-5 px-6 text-sm text-gray-700">{applicant.trainingSector}</td>
                    <td className="py-5 px-6">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                        applicant.applicationStatus === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : applicant.applicationStatus === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {applicant.applicationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApplicantList;
