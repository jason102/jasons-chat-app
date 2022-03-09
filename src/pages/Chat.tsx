import React from 'react';
import ChatPane from 'components/chat-panel/ChatPane';
import UsersList from 'components/user-list/UsersList';
import { UsersAndChatContainer } from './Chat.styles';

const Chat: React.FC = () => (
  <UsersAndChatContainer>
    <UsersList />
    <ChatPane />
  </UsersAndChatContainer>
);

export default Chat;
