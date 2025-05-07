import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material';

const MessageSidebar = ({ conversations, onSelectConversation }) => {
  return (
    <Paper elevation={3} sx={{ width: 300, height: '100vh', overflowY: 'auto' }}>
      <List>
        {conversations.map((conversation) => (
          <ListItem
            button
            key={conversation._id}
            onClick={() => onSelectConversation(conversation)}
          >
        <ListItemText primary={conversation.first_name ? conversation.first_name : conversation.contact_name} />          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default MessageSidebar;
