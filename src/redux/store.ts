import { configureStore } from '@reduxjs/toolkit';
import otherUsers from './slices/otherUsersSlice';

const store = configureStore({
  reducer: {
    otherUsers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
