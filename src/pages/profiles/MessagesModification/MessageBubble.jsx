import React from 'react';
import { Box, Typography } from '@mui/material';

const MessageBubble = ({ msg, isOwnMessage }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start', 
        mb: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: isOwnMessage ? '#1976d2' : '#e0e0e0', 
          color: isOwnMessage ? '#fff' : '#000',
          p: 2,
          borderRadius: '16px',
          maxWidth: '75%',
        }}
      >
        <Typography variant="body1">
          {msg.content}
        </Typography>
      </Box>
    </Box>
  );
};


export default MessageBubble;
