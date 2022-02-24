import { Button } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

interface Props {
  user: DocumentData;
}

const OtherFriend: React.FC<Props> = ({ user }) => {
  const chatData = useContext(ChatContext);

  return (
    <Button onClick={() => chatData?.selectUser(user)}>{user.name}</Button>
  );
};

export default OtherFriend;
