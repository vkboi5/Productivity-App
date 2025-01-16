import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@mui/material';
import styles from './Profile.module.css'; // Import the CSS module

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email, bio, notifications } = response.data.user;
        setName(name);
        setEmail(email);
        setBio(bio);
        setNotifications(notifications);
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleSave = () => {
    console.log('Profile updated:', { name, email, bio });
    // Add code to save the changes to the backend
  };

  const handlePasswordChange = () => {
    console.log('Password changed:', password);
    // Add code to change the password
  };

  const handleAccountDisable = () => {
    console.log('Account disabled');
    // Add code to disable the account
  };

  const handleAccountDelete = () => {
    console.log('Account deleted');
    // Add code to delete the account
  };

  const toggleNotifications = () => setNotifications(!notifications);

  const openDangerDialog = () => setOpenDialog(true);
  const closeDangerDialog = () => setOpenDialog(false);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Paper
      sx={{
        maxWidth: '90%',
        padding: 4,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className={styles['scroll-container']}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', color: '#6a1b9a', mb: 4 }}
        >
          Profile Settings
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              }}
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
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1 }}
            />
            <TextField
              fullWidth
              label="Bio"
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#6a1b9a',
                color: '#fff',
                mt: 2,
                '&:hover': { backgroundColor: '#8e24aa' },
              }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a' }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1 }}
            />
            <Button
              variant="outlined"
              sx={{ mt: 1, color: '#6a1b9a', borderColor: '#6a1b9a' }}
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a' }}>
              Notification Settings
            </Typography>
            <FormControlLabel
              control={<Switch checked={notifications} onChange={toggleNotifications} color="secondary" />}
              label="Enable Email Notifications"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Dialog open={openDialog} onClose={closeDangerDialog}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to proceed? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDangerDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAccountDisable} color="warning">
              Disable Account
            </Button>
            <Button onClick={handleAccountDelete} color="error">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
};

export default Profile;
