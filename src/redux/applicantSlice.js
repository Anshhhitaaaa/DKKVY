
// src/redux/applicantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock applicants data
const mockApplicants = [
  { id: '1', applicantId: 'DKKVY202600001', name: 'Rajesh Kumar', mobile: '9876543211', trainingSector: 'Tailoring Trade / Sewing', applicationStatus: 'PENDING' },
  { id: '2', applicantId: 'DKKVY202600002', name: 'Priya Sharma', mobile: '9876543212', trainingSector: 'Bakery', applicationStatus: 'APPROVED' },
  { id: '3', applicantId: 'DKKVY202600003', name: 'Amit Singh', mobile: '9876543213', trainingSector: 'Candle Making', applicationStatus: 'COMPLETED' },
  { id: '4', applicantId: 'DKKVY202600004', name: 'Sunita Devi', mobile: '9876543214', trainingSector: 'Essential Oil Making', applicationStatus: 'PENDING' },
  { id: '5', applicantId: 'DKKVY202600005', name: 'Vikram Yadav', mobile: '9876543215', trainingSector: 'Soap Making', applicationStatus: 'APPROVED' },
];

const initialState = {
  applicants: mockApplicants,
  currentApplicant: null,
  loading: false,
  error: null,
  meta: { page: 1, limit: 10, total: 5 },
};

export const getApplicants = createAsyncThunk('applicants/getApplicants', async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { applicants: mockApplicants, meta: { page: 1, limit: 10, total: 5 } };
});

export const getApplicantById = createAsyncThunk('applicants/getApplicantById', async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockApplicants.find(app => app.id === id);
});

export const createApplicant = createAsyncThunk('applicants/createApplicant', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return data;
});

const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Applicants
      .addCase(getApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload.applicants;
        state.meta = action.payload.meta;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = applicantSlice.actions;
export default applicantSlice.reducer;
