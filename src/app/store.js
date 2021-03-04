import { configureStore } from '@reduxjs/toolkit';
import nasaReducer from '../features/nasa/Slice/nasaSlice';

export default configureStore({
  reducer: {
    nasa: nasaReducer,
  },
});
