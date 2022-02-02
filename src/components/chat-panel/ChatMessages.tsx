import { DocumentData } from 'firebase/firestore';
import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { ChatMessagesContainer } from './ChatMessages.styles';
import Message from './Message';

const ChatMessages: React.FC = () => {
  const chatData = useContext(ChatContext);

  return (
    <ChatMessagesContainer>
      {chatData?.messages.map((message: DocumentData) => {
        return <Message key={message.createdAt} message={message} />;
      })}
    </ChatMessagesContainer>
  );
};

export default ChatMessages;
