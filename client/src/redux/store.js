
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import applicantReducer from './applicantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    applicants: applicantReducer,
  },
});
