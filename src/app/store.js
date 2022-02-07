import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import blogReducer from '../features/blogSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
  },
});
