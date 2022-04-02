import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 93vh;
`;

export const UserToChatWithName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 2px solid black;
  background-color: #dedede;
  padding: 20px 20px;
`;

export const ChatScrollWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 10px 10px 10px 10px;
`;
