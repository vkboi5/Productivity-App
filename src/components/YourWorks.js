// src/components/YourWorks.js
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const YourWorks = () => {
  const [works, setWorks] = useState([
    { title: 'React Project', description: 'Building a dashboard with React.' },
    { title: 'API Integration', description: 'Integrating RESTful APIs into frontend.' },
  ]);
  const [open, setOpen] = useState(false);
  const [newWork, setNewWork] = useState({ title: '', description: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddWork = () => {
    setWorks([...works, newWork]);
    setNewWork({ title: '', description: '' });
    handleClose();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Works
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add New Work
      </Button>
      <List>
        {works.map((work, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={work.title}
              secondary={work.description}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Work</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newWork.title}
            onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newWork.description}
            onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddWork}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default YourWorks;
