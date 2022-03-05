import { Button } from '@mui/material';
import React from 'react';
import { OtherUser } from '../../types';
import useSelectUser from './useSelectUser';

interface Props {
  user: OtherUser;
}

const OtherFriend: React.FC<Props> = ({ user }) => {
  const { onSelectUser } = useSelectUser();

  return <Button onClick={() => onSelectUser(user)}>{user.name}</Button>;
};

export default OtherFriend;
