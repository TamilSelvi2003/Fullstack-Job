import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../redux/slice/JobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});