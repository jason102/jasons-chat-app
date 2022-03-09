import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, OtherUser } from 'types';

const EMPTY_USER: OtherUser = {
  uid: '',
  name: '',
  email: '',
};

interface ConversationState {
  userToChatWith: OtherUser;
  messages: Message[];
}

const initialState: ConversationState = {
  userToChatWith: EMPTY_USER,
  messages: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setUserToChatWith(state, { payload: user }: PayloadAction<OtherUser>) {
      state.userToChatWith = user;
    },
    setMessages(state, { payload: messages }: PayloadAction<Message[]>) {
      state.messages = messages;
    },
  },
});

const { actions, reducer } = conversationSlice;

export const { setUserToChatWith, setMessages } = actions;

export default reducer;
