// src/components/HabitTracking.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';

// Register the components needed by Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const HabitTracking = () => {
  const [habits, setHabits] = useState([{ name: 'Exercise', progress: [5, 6, 8, 10] }]);
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { name: newHabit, progress: [0] }]);
      setNewHabit('');
    }
  };

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: habits.map((habit) => ({
      label: habit.name,
      data: habit.progress,
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    })),
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Habit Tracking
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label="New Habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddHabit}>
          Add
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {habits.map((habit, index) => (
          <ListItem key={index}>
            <ListItemText primary={habit.name} />
          </ListItem>
        ))}
      </List>
      <Line data={data} />
    </Box>
  );
};

export default HabitTracking;
