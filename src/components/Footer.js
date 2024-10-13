// src/components/Footer.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => (
  <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#f4f4f4' }}>
    <Typography variant="body2" color="text.secondary">
      © 2024 Productivity Platform. All Rights Reserved.
    </Typography>
  </Box>
);

export default Footer;
