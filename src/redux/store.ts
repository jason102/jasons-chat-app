import { configureStore } from '@reduxjs/toolkit';
import users from './slices/usersSlice';

const store = configureStore({
  reducer: {
    users,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
