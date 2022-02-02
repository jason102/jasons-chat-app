import styled from 'styled-components';

export const ChatMessagesContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  min-height: -webkit-min-content;
  padding: 10px 10px 10px 10px;
`;

const Message = styled.div`
  border: 2px solid black;
  border-radius: 7px;
  padding: 15px;
  margin: 8px 0px 0px 0px;
`;

export const MessageFromMe = styled(Message)`
  align-self: right;
`;

export const MessageFromFriend = styled(Message)`
  align-self: left;
`;

interface MessageRowProps {
  isSentByMe: boolean;
}

export const MessageRow = styled.div<MessageRowProps>`
  display: flex;
  flex-direction: row;

  justify-content: ${(props) => (props.isSentByMe ? 'flex-end' : 'flex-start')};
`;
