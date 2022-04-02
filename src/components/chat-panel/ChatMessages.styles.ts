import styled from 'styled-components';

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
