import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Message } from '../../types';
import { ChatMessagesContainer } from './ChatMessages.styles';
import MessageContainer from './Message';

const ChatMessages: React.FC = () => {
  const { messages } = useSelector((state: RootState) => state.conversation);

  return (
    <ChatMessagesContainer>
      {messages.map((message: Message, index: number) => {
        return <MessageContainer key={index} message={message} />;
      })}
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
