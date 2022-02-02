import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import useNewMessageScrolling from '../../logic/useNewMessageScrolling';
import ChatMessages from './ChatMessages';
import {
  ChatScrollWrapper,
  ChatContainer,
  UserToChatWithName,
  SubmitFormContainer,
} from './ChatPane.styles';
import SubmitMessageInput from './SubmitMessageInput';

const ChatPane: React.FC = () => {
  const chatData = useContext(ChatContext);
  const { scrollRef, onScroll } = useNewMessageScrolling();

  return (
    <ChatContainer>
      <UserToChatWithName>
        {chatData?.userToChatWith
          ? chatData.userToChatWith.name
          : 'Select a user on the left to chat with!'}
      </UserToChatWithName>
      {chatData?.userToChatWith && (
        <>
          <ChatScrollWrapper onScroll={onScroll}>
            <ChatMessages />
            <div ref={scrollRef} />
          </ChatScrollWrapper>
          <SubmitFormContainer>
            <SubmitMessageInput />
          </SubmitFormContainer>
        </>
      )}
    </ChatContainer>
  );
};

export default ChatPane;
