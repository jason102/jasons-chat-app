import React from 'react';
import ChatPane from '../components/chat-panel/ChatPane';
import UsersList from '../components/user-list/UsersList';
import ChatProvider from '../context/ChatContext';
import { UsersAndChatContainer } from './Chat.styles';

const Chat: React.FC = () => {
  return (
    <ChatProvider>
      <UsersAndChatContainer>
        <UsersList />
        <ChatPane />
      </UsersAndChatContainer>
    </ChatProvider>
  );
};

export default Chat;
