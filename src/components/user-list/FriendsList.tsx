import React from 'react';
import {
  TextField,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { OtherUser } from 'types';
import OtherFriend from './OtherFriend';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Container, Header } from './FriendsList.styles';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const FriendsList: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  const { myFriends } = useSelector((state: RootState) => state.users);

  // Animation: Wait for the InviteFriendPanel to slide off the screen (delay) before fading in
  // Instantly hide this component when opening InviteFriendPanel so both components are not in the DOM at the same time
  return (
    <motion.div
      key='FriendsList'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25 }}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <TextField
            id='outlined-basic'
            label='Search conversations'
            variant='outlined'
            size='small'
            fullWidth
          />
        </div>
        <IconButton color='success' onClick={toggleOpenInvitePanel}>
          <PersonAddIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          paddingTop: 10,
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {myFriends.map((user: OtherUser) => (
            <OtherFriend key={user.uid} user={user} />
          ))}
        </div>
        <Accordion
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>Friend requests</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Typography>Friend invite 1</Typography>
            <Typography>Friend invite 2</Typography>
            <Typography>Friend invite 3</Typography>
            <Typography>Friend invite 4</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </motion.div>
  );
};

export default FriendsList;
