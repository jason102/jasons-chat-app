import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
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
  overflow: auto;
`;

export const SubmitFormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;
