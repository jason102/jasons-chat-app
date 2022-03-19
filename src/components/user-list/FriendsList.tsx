import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { OtherUser } from 'types';
import OtherFriend from './OtherFriend';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Header, ScrollContainer, List } from './FriendsList.styles';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const FriendsList: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  const { myFriends } = useSelector((state: RootState) => state.users);

  return (
    <>
      <Header>
        <TextField
          id='outlined-basic'
          label='Search conversations'
          variant='outlined'
          size='small'
          fullWidth
        />
        <IconButton color='success' onClick={toggleOpenInvitePanel}>
          <PersonAddIcon />
        </IconButton>
      </Header>
      <ScrollContainer>
        <List>
          {myFriends.map((user: OtherUser, index: number) => (
            <OtherFriend key={index} user={user} />
          ))}
        </List>
      </ScrollContainer>
    </>
  );
};

export default FriendsList;
