import { configureStore } from '@reduxjs/toolkit';
import nasaReducer from '../features/nasa/nasaSlice';

export default configureStore({
  reducer: {
    nasa: nasaReducer,
  },
});
