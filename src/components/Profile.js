// src/components/Profile.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, Grid } from '@mui/material';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('A short bio about yourself.');

  const handleSave = () => {
    console.log('Profile updated:', { name, email, bio });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar
            sx={{ width: 120, height: 120 }}
            alt={name}
            src="https://via.placeholder.com/150"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
