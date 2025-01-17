// src/components/SessionsCollaborations.js
import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Divider, List, ListItem, ListItemText } from '@mui/material';

const SessionsCollaborations = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Stores all messages in the current session

  // Regex for detecting Zoom and Google Meet links
  const zoomRegex = /https:\/\/zoom\.us\/j\/\d+/i;
  const meetRegex = /https:\/\/meet\.google\.com\/\S+/i;

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(), // A simple unique ID based on timestamp
        content: message,
        author: 'User', // Hardcoded for now, could be dynamic later
        isLink: zoomRegex.test(message) || meetRegex.test(message), // Check if it's a link
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', height: '60vh' }}>
      <Typography variant="h4" gutterBottom>
        Sessions & Collaborations
      </Typography>
      
      {/* Session Messages List */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: 2,
          border: '1px solid #ddd',
          borderRadius: 1,
          padding: 2,
          backgroundColor: '#f4f4f4',
        }}
      >
        <List>
          {messages.map((msg) => (
            <ListItem key={msg.id}>
              <ListItemText
                primary={msg.isLink ? (
                  <a href={msg.content} target="_blank" rel="noopener noreferrer">{msg.content}</a>
                ) : (
                  `${msg.author}: ${msg.content}`
                )}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Message Input Box */}
      <Box sx={{ display: 'flex' }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SessionsCollaborations;
