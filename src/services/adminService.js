import api from './api';

export const loginAdmin = (loginId, password) =>
  api.post('/admins/login', { loginId, password });

export const getPendingApplicants = (token) =>
  api.get('/admin/applicants/pending', { headers: { Authorization: `Bearer ${token}` } });

export const approveApplicant = (applicantId, token) =>
  api.put(`/admin/applicants/${applicantId}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });

export const rejectApplicant = (applicantId, rejectionReason, token) =>
  api.put(`/admin/applicants/${applicantId}/reject`, { rejectionReason }, { headers: { Authorization: `Bearer ${token}` } });
