import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OtherUser {
  uid: string;
  email: string;
  name: string;
}

interface OtherUsersState {
  myFriends: OtherUser[];
  myFriendRequests: OtherUser[];
}

const initialState: OtherUsersState = {
  myFriends: [],
  myFriendRequests: [],
};

const otherUsersSlice = createSlice({
  name: 'otherUsers',
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

const { actions, reducer } = otherUsersSlice;

export const { setMyFriends, setMyFriendRequests } = actions;

export default reducer;
