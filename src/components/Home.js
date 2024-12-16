import React, { useRef } from 'react';
import { 
  Box, Typography, Button, Grid, Container, Paper, TextField 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaRegComments, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import FeatureCard from './FeatureCard';
import styles from './Homepage.module.css'; // Import CSS module
import gif from '../assets/1664879763504-unscreen.gif'

const features = [
  { title: 'Your Works', desc: 'Track tools and history.' },
  { title: 'ToDo & Mind Mapping', desc: 'Organize tasks visually.' },
  { title: 'Habit Tracking', desc: 'Track habits effectively.' },
  { title: 'Community', desc: 'Engage and share with others.' },
  { title: 'Progress', desc: 'Monitor productivity milestones.' },
  { title: 'Sessions & Collaborations', desc: 'Study with peers.' },
];

const testimonials = [
  { name: 'Alice Smith', feedback: 'This app changed the way I manage my tasks!' },
  { name: 'John Doe', feedback: 'Simple and effective habit tracking.' },
  { name: 'Sarah Lee', feedback: 'The collaboration feature is a game-changer.' },
];

const faqItems = [
  { question: 'How do I track my habits?', answer: 'Use the Habit Tracking section to log your daily progress.' },
  { question: 'Can I collaborate with others?', answer: 'Yes, you can create sessions to study or collaborate with your peers.' },
  { question: 'Is this app free?', answer: 'Yes, all core features are available for free.' },
];

const Homepage = () => {
  const featuresRef = useRef(null);

  const handleExploreFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
      <Box className={styles.heroContent}>
        <Typography variant="h2" className={styles.heroTitle}>
          THE INTERNET'S FILE API
        </Typography>
        <Typography variant="h6" className={styles.heroSubtitle}>
          Add file uploads and retrieval in minutes so you can focus on your app — 
          because you’ve got better things to code than infrastructure.
        </Typography>
        <Box className={styles.buttonGroup}>
          <Button variant="contained" className={styles.getStartedButton}>Get started</Button>
          <Button variant="contained" className={styles.readDocsButton}>Read docs</Button>
          <Button variant="contained" className={styles.joinDiscordButton}>Join discord</Button>
          <Button variant="contained" className={styles.readBlogButton}>Read blog</Button>
        </Box>
      </Box>
      <img src={gif} alt="Animated productivity visual" className={styles.heroGif} />
    </Box>

      {/* Discover Section */}
      <Box className={styles.discoverSection}>
        <Typography variant="h4" className={styles.discoverTitle}>
          Discover All Our Tools and Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard title={feature.title} description={feature.desc} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* User Testimonials Section */}
      <Box className={styles.testimonialsSection}>
        <Typography variant="h4" className={styles.sectionTitle}>
          What Our Users Say
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} className={styles.testimonialCard}>
                <Typography variant="h6" className={styles.testimonialName}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.feedback}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box className={styles.faqSection}>
        <Typography variant="h4" className={styles.sectionTitle}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {faqItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="h6" className={styles.faqQuestion}>
                <FaQuestionCircle /> {item.question}
              </Typography>
              <Typography variant="body2" className={styles.faqAnswer}>
                {item.answer}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Feedback Section */}
      <Box className={styles.feedbackSection}>
        <Typography variant="h4" className={styles.sectionTitle}>
          We Value Your Feedback
        </Typography>
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          className={styles.feedbackInput}
        />
        <Button
          variant="contained"
          className={styles.sendButton}
          endIcon={<FaPaperPlane />}
          sx={{ marginTop: '16px' }}
        >
          Send Feedback
        </Button>
      </Box>

      {/* Footer Section */}
      <Box className={styles.footer}>
        <Typography variant="body2">
          © 2024 Productivity Hub. All Rights Reserved. |{' '}
          <Link to="#" className={styles.footerLink}>
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link to="#" className={styles.footerLink}>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Homepage;

