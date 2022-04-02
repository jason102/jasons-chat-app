import React from 'react';
import { useSelector } from 'react-redux';
import useNewMessageScrolling from 'hooks/useNewMessageScrolling';
import useOtherPersonIsTyping from 'hooks/useOtherPersonIsTyping';
import { RootState } from 'redux/store';
import BouncingDots from 'components/BouncingDots';
import ChatMessages from './ChatMessages';
import {
  ChatScrollWrapper,
  ChatContainer,
  UserToChatWithName,
} from './ChatPane.styles';
import SubmitMessageInput from './SubmitMessageInput';

const ChatPane: React.FC = () => {
  const {
    userToChatWith: { uid: otherUserId, name: otherUserName },
  } = useSelector((state: RootState) => state.conversation);
  const hasSelectedOtherUser = otherUserId.length > 0;

  const { scrollRef, onScroll } = useNewMessageScrolling();
  const { otherPersonIsTyping } = useOtherPersonIsTyping();

  return (
    <ChatContainer>
      <UserToChatWithName>
        {hasSelectedOtherUser
          ? otherUserName
          : 'Select a user on the left to chat with!'}
      </UserToChatWithName>
      {hasSelectedOtherUser && (
        <>
          <ChatScrollWrapper onScroll={onScroll}>
            <ChatMessages />
            <div ref={scrollRef} />
          </ChatScrollWrapper>
          {otherPersonIsTyping && <BouncingDots />}
          <SubmitMessageInput />
        </>
      )}
    </ChatContainer>
  );
};

export default ChatPane;
