import React, { useRef } from 'react';
import { 
  Box, Typography, Button, Grid, Paper, TextField 
} from '@mui/material';
import { Link } from 'react-router-dom';
import {  FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
// import FeatureCard from './FeatureCard';
import styles from './Homepage.module.css'; // Import CSS module
import gif from '../assets/1664879763504-unscreen.gif'


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
    <button className={styles.getStartedButton}>Get Started</button>
<button className={styles.readDocsButton}>Read Docs</button>
<button className={styles.joinDiscordButton}>Join Discord</button>
<button className={styles.readBlogButton}>Read Blog</button>
    </Box>
  </Box>
  <img src={gif} alt="Animated productivity visual" className={styles.heroGif} />
</Box>


      {/* Discover Section */}
<Box className={styles.discoverSection}>
  <Typography variant="h4" className={styles.discoverTitle}>
    Discover All Our Tools and Features
  </Typography>
  <br />

  {/* Grid Layout */}
  <Grid container spacing={3} justifyContent="center">
    {[
      { title: "Your Works", desc: "Manage all your projects and tasks efficiently.", className: styles.yourWorks },
      { title: "ToDo & Mind Mapping", desc: "Organize tasks and visualize ideas easily.", className: styles.todoMindMapping },
      { title: "Habit Tracking", desc: "Track and build productive habits.", className: styles.habitTracking },
      { title: "Community", desc: "Collaborate and connect with others.", className: styles.community },
      { title: "Progress", desc: "Track your progress over time.", className: styles.progress },
      { title: "Sessions & Collaborations", desc: "Work seamlessly with your team.", className: styles.sessionsCollab }
    ].map((section, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Box className={`${styles.sectionContainer} ${section.className}`}>
          <Typography variant="h5" className={styles.sectionTitle}>{section.title}</Typography>
          <Typography variant="body2">{section.desc}</Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>


      {/* User Testimonials Section */}
      <Box className={styles.testimonialsSection}>
        <Typography variant="h4" className={styles.testimonialsText}>
          What Our Users Say
        </Typography>
        <br/>
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
        <Typography variant="h4" className={styles.faqText}>
          Frequently Asked Questions
        </Typography>
        <br/>
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
        <Typography variant="h4" className={styles.feedbackText}>
          We Value Your Feedback
        </Typography>
        <TextField
  label="Your Feedback"
  multiline
  rows={4}
  variant="outlined"
  fullWidth
  className={styles.feedbackInput}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" }, // Default border color
      "&:hover fieldset": { borderColor: "white" }, // Hover state
      "&.Mui-focused fieldset": { borderColor: "white" }, // Focused state
      "& input, & textarea": { color: "white" }, // Text color for input
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label text color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Focused label text color
    }
  }}
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

