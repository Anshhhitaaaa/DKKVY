
import AdminLayout from '../components/AdminLayout';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  return (
    <AdminLayout title="Profile">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
            {user.name ? user.name.charAt(0) : 'A'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{user.name || 'Admin'}</h2>
            <p className="text-lg text-gray-600 mt-2">{user.email || ''}</p>
            <p className="text-sm text-blue-600 mt-1 font-medium">{user.admin_id || ''}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{user.name || 'Not available'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-900">{user.email || 'Not available'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Admin ID</p>
                <p className="text-lg font-medium text-gray-900">{user.admin_id || 'Not available'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="text-lg font-medium text-gray-900">{user.role || 'Not available'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
                Change Password
              </button>
              <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
