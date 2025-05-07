import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import MessageSidebar from './MessageSidebar';
import ConversationDetails from './ConversationDetails';
import { AuthContext } from '../../../context/AuthContext';
import { LanguageContext } from '../../../context/AppContext';
import apiService from '../../../services/ZooZoneAPIService';
import { io } from 'socket.io-client';
import Messages from '../../../lang/Messages.json';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://www.zoozone.ca' 
  : 'http://127.0.0.1:5000';   

const socket = io(API_BASE_URL); 

const MessagesDetails = () => {
  const { userData } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [user, setUser]= useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let usersResponse;
        if (userData.member) {
          usersResponse = await apiService.getAllSuppliers();
          setUser(userData.member);
        } else if (userData.supplier) {
          usersResponse = await apiService.getAllMembers();
          setUser(userData.supplier);

        }
        setConversations(usersResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    if (userData.supplier) {
      socket.emit('join', { room: `supplier_${userData.supplier._id}` });
    } else if (userData.member) {
      socket.emit('join', { room: `member_${userData.member._id}` });
    }

    socket.on('message', (newMessage) => {
      if (selectedConversation && newMessage.senderId === selectedConversation._id) {
        setSelectedConversation((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));
      }
    });

    return () => {
      socket.off('message');
    };
  }, [userData, selectedConversation]);

  const handleSelectConversation = async (user) => {
    try {
      const response = await apiService.getMessagesWithUser(user._id);
      const title = userData.member ? user.contact_name  : user.first_name ;
 
      setSelectedConversation({
        title: title,
        _id: user._id,
        messages: response.data,
      });
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {

      const newMessage = {
        senderId: user._id, 
        recipientId: selectedConversation._id,
        content: message,
        timestamp: new Date().toISOString(),  
      };
  

      socket.emit('send_message', newMessage);
  
      setSelectedConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
  
      setMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <MessageSidebar conversations={conversations} onSelectConversation={handleSelectConversation} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {selectedConversation ? (
            <ConversationDetails
              conversation={selectedConversation}
              onBack={() => setSelectedConversation(null)}
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
              messagesEndRef={messagesEndRef}
              user_id={user._id}
            />
          ) : (
            <Typography variant="h6" sx={{ margin: 'auto' }}>
              {Messages.messages['selectConversation'][language]}
            </Typography>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MessagesDetails;
