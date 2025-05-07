import React, { useContext, useEffect } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import { LanguageContext } from '../../../context/AppContext';
import messagesData from '../../../lang/Messages.json';
import MessageBubble from './MessageBubble'; 

const ConversationDetails = ({ conversation, onBack, message, setMessage, handleSendMessage, messagesEndRef, user_id }) => {
  const { language } = useContext(LanguageContext);
  const messagesText = messagesData.messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Button variant="contained" onClick={onBack}>
            {messagesText.backToConversations[language]}
          </Button>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              margin: '20px auto',
              maxWidth: '600px',
            }}
          >
            <Typography variant="h4" gutterBottom>
              {conversation.title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '400px', overflowY: 'auto' }}>
              {conversation.messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  msg={msg}
                  isOwnMessage={msg.senderId === user_id}
                />
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
              <TextField
                label={messagesText.typeYourMessage[language]}
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress} 
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleSendMessage}>
                {messagesText.send[language]}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ConversationDetails;
