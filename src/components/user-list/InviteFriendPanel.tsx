import React, { FormEvent } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Container,
  ClosePanelHeader,
  InviteFriendContainer,
} from './InviteFriendPanel.styles';
import { TextField, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const InviteFriendPanel: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  const onSearchFriend = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <ClosePanelHeader>
        <IconButton onClick={toggleOpenInvitePanel} edge='start'>
          <ArrowBackIcon />
        </IconButton>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Add a friend
        </Typography>
      </ClosePanelHeader>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Send a chat invite to any registered user by entering their email
        address:
      </Typography>
      <InviteFriendContainer onSubmit={onSearchFriend}>
        <TextField
          label={`Friend's email address`}
          variant='outlined'
          size='small'
          fullWidth
        />
        <IconButton type='submit'>
          <SearchIcon />
        </IconButton>
      </InviteFriendContainer>
      {/* Collapse component that expands to show search result including user details like name */}
    </Container>
  );
};

export default InviteFriendPanel;
