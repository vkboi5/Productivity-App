// src/components/FeatureCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const FeatureCard = ({ title, description }) => (
  <Card
    sx={{
      borderRadius: 4,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.05)' },
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" sx={{ color: '#6c63ff' }}>
        Learn More
      </Button>
    </CardActions>
  </Card>
);

export default FeatureCard;
