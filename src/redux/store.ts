import { configureStore } from '@reduxjs/toolkit';
import users from './slices/usersSlice';
import conversation from './slices/conversationSlice';

const store = configureStore({
  reducer: {
    users,
    conversation,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
