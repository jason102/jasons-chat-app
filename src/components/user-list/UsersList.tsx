import { DocumentData } from 'firebase/firestore';
import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import OtherUser from './OtherUser';
import { Container, UsersListMessage } from './UsersList.styles';

const UsersList: React.FC = () => {
  const chatData = useContext(ChatContext);

  return (
    <Container>
      <UsersListMessage>User Chat List:</UsersListMessage>
      {chatData?.otherUsers &&
        chatData.otherUsers.map((user: DocumentData) => (
          <OtherUser key={user.uid} user={user} />
        ))}
      {chatData?.otherUsers && chatData.otherUsers.length === 0 && (
        <UsersListMessage>Loading users...</UsersListMessage>
      )}
    </Container>
  );
};

export default UsersList;
