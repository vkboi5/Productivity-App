// src/components/Progress.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';

// Register the components needed by Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const Progress = () => {
  const data = {
    labels: ['Milestone 1', 'Milestone 2', 'Milestone 3', 'Milestone 4'],
    datasets: [
      {
        label: 'Progress',
        data: [30, 50, 70, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Progress & Milestones
      </Typography>
      <Bar data={data} />
    </Box>
  );
};

export default Progress;
