// src/components/Homepage.js
import React from 'react';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          background: 'linear-gradient(145deg, #f3f5ff, #e2e6ff)',
          textAlign: 'center',
          flexDirection: 'column',
          padding: '0 20px',
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 'bold', marginBottom: 2, color: '#3a3a3a' }}
        >
          Welcome to Your Productivity Hub
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: '#555', marginBottom: 4, maxWidth: '600px' }}
        >
          Manage your tasks, track habits, collaborate effortlessly, and achieve
          your goals all in one place.
        </Typography>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#6c63ff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              '&:hover': { backgroundColor: '#5a54e8' },
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      {/* Feature Highlights */}
      <Container maxWidth="lg" sx={{ padding: '50px 0' }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 600, marginBottom: 4 }}
        >
          Explore Our Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'Your Works', desc: 'Track tools and history.' },
            { title: 'ToDo & Mind Mapping', desc: 'Organize tasks visually.' },
            { title: 'Habit Tracking', desc: 'Track habits effectively.' },
            { title: 'Community', desc: 'Engage and share with others.' },
            { title: 'Progress', desc: 'Monitor productivity milestones.' },
            { title: 'Sessions & Collaborations', desc: 'Study with peers.' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          backgroundColor: '#6c63ff',
          color: '#fff',
          padding: '10px 0',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2024 Productivity Hub. All Rights Reserved. |{' '}
          <Link
            to="/terms"
            style={{ textDecoration: 'none', color: '#b3b3ff' }}
          >
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link
            to="/privacy"
            style={{ textDecoration: 'none', color: '#b3b3ff' }}
          >
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Homepage;
