import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OtherUser {
  uid: string;
  email: string;
  name: string;
}

interface UsersState {
  myFriends: OtherUser[];
  myFriendRequests: OtherUser[];
}

const initialState: UsersState = {
  myFriends: [],
  myFriendRequests: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setMyFriends(state, { payload: myFriends }: PayloadAction<OtherUser[]>) {
      state.myFriends = myFriends;
    },
    setMyFriendRequests(
      state,
      { payload: myFriendRequests }: PayloadAction<OtherUser[]>
    ) {
      state.myFriendRequests = myFriendRequests;
    },
  },
});

const { actions, reducer } = usersSlice;

export const { setMyFriends, setMyFriendRequests } = actions;

export default reducer;
