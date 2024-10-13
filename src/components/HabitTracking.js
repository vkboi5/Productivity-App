import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Calendar from 'react-calendar'; // For Calendar view
import 'react-calendar/dist/Calendar.css';
import styles from './HabitTracking.module.css'; // Import CSS module

const HabitTracking = () => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [habitCompletion, setHabitCompletion] = useState({}); // Track completion for each habit

  // Open dialog to add a new habit
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Add new habit
  const handleAddHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit]);
      setNewHabit('');
      handleCloseDialog();
    }
  };

  // Track habit completion for the selected date
  const markHabitAsDone = (habit) => {
    const dateKey = selectedDate.toDateString();
    setHabitCompletion((prev) => ({
      ...prev,
      [habit]: { ...(prev[habit] || {}), [dateKey]: true },
    }));
  };

  // Generate grid based on habit completion
  const generateGrid = (habit) => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const completion = habitCompletion[habit] || {};

    return Array.from({ length: daysInMonth }).map((_, index) => {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1);
      const dateKey = date.toDateString();
      const isCompleted = completion[dateKey] || false;

      return (
        <div
          key={index}
          className={`${styles.gridBox} ${isCompleted ? styles.completed : ''}`}
          title={dateKey}
        />
      );
    });
  };

  return (
    <Box className={styles.habitTrackingContainer}>
      <Typography variant="h4" gutterBottom>
        Habit Tracking
      </Typography>

      <Button variant="contained" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        Add New Habit
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Habit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Habit Name"
            fullWidth
            variant="outlined"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddHabit}>Add Habit</Button>
        </DialogActions>
      </Dialog>

      {habits.map((habit, index) => (
        <Box key={index} className={styles.habitSection}>
          <Typography variant="h6">{habit}</Typography>
          <Box className={styles.gridContainer}>{generateGrid(habit)}</Box>

          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            className={styles.calendar}
          />

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => markHabitAsDone(habit)}
          >
            Mark Done for {selectedDate.toDateString()}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default HabitTracking;
