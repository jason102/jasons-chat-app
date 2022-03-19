import React from 'react';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField, IconButton, Typography } from '@mui/material';
// import { ClosePanelHeader } from './InviteFriendPanel.styles';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const InviteFriendPanel: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  // Animation: Slide/fade in from the right side of the screen for opening the panel (closing the panel is the opposite)
  return (
    <motion.div
      key='InviteFriendPanel'
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.25 }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <IconButton onClick={toggleOpenInvitePanel} edge='start'>
          <ArrowBackIcon />
        </IconButton>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Add a friend
        </Typography>
      </div>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Send a chat invite to any registered user by entering their email
        address:
      </Typography>
      <TextField
        sx={{ mt: 1 }}
        label='Search conversations'
        variant='outlined'
        size='small'
        fullWidth
      />
    </motion.div>
  );
};

export default InviteFriendPanel;
