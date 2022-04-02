import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Message } from 'types';
import MessageContainer from './Message';

const ChatMessages: React.FC = () => {
  const { messages } = useSelector((state: RootState) => state.conversation);

  return (
    <>
      {messages.map((message: Message, index: number) => {
        return <MessageContainer key={index} message={message} />;
      })}
    </>
  );
};

export default ChatMessages;
