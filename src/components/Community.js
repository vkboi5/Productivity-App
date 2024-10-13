// src/components/Community.js
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const Community = () => {
  const [posts, setPosts] = useState([{ user: 'Alice', content: 'Hello everyone!' }]);
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { user: 'You', content: newPost }]);
      setNewPost('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Community
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label="New Post"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddPost}>
          Post
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {posts.map((post, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${post.user}: ${post.content}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Community;
