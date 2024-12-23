import React, { useRef, useState } from 'react';
import { 
  Box, Typography, Button, Grid, Paper, TextField, Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Homepage.module.css'; // Import CSS module
import gif from '../assets/1664879763504-unscreen.gif';

const testimonials = [
  { 
    name: 'Alex Smith', 
    feedback: 'This app has truly revolutionized the way I manage my tasks! The daily reminders and habit-tracking features have kept me on track, and the design is so user-friendly. It’s like having a personal assistant in my pocket.', 
    img: require('../assets/B1.jpeg'), 
    rating: 5 
  },
  { 
    name: 'John Doe', 
    feedback: 'I’ve tried countless habit trackers, but this one stands out. The simplicity of its interface combined with the powerful analytics feature has made it my go-to tool for productivity. Highly recommend it to anyone looking to build better habits!', 
    img:  require('../assets/B2.jpeg'), 
    rating: 4 
  },
  { 
    name: 'Sarah Lee', 
    feedback: 'The collaboration feature is a game-changer for team projects. I’ve used it to coordinate tasks with my colleagues, and the visual progress tracking keeps everyone motivated. It’s a must-have app for professionals.', 
    img:  require('../assets/G1.jpeg'), 
    rating: 5 
  },
  { 
    name: 'Michael Brown', 
    feedback: 'This app has simplified my life in ways I didn’t think possible. From managing personal goals to tracking my team’s deadlines, everything is so well-organized. Plus, the app’s dark mode is an absolute treat for my late-night work sessions!', 
    img:  require('../assets/B3.jpeg'), 
    rating: 5 
  },
  { 
    name: 'Emily Johnson', 
    feedback: 'As someone who often struggles with procrastination, this app has been a lifesaver. The habit reminders and streak tracking keep me accountable, and the motivational quotes are a nice touch. My productivity has soared since I started using it!', 
    img: require('../assets/G2.jpeg'), 
    rating: 4 
  },
];

const faqItems = [
  { question: 'How do I track my habits?', answer: `You can track your habits using the Habit Tracking section in the app. 
    Simply create a list of habits you want to develop or monitor, and set daily or weekly goals for each habit. 
    The app allows you to log your progress daily, view detailed statistics, and receive reminders to stay consistent. 
    You can also customize your habit tracker by categorizing habits or assigning specific colors for easier visualization.` },

  { question: 'Can I collaborate with others?', answer: `Absolutely! The app offers a collaboration feature where you can invite peers, friends, or colleagues to work on shared tasks, projects, or study sessions. 
    You can create private or public sessions to interact with others, exchange ideas, and share resources in real time. 
    This feature is perfect for teams or study groups looking to stay organized and aligned while working toward a common goal.` },

  { question: 'Is this app free?', answer: `Yes, the app is free to use, and all core features are available at no cost. 
    This includes habit tracking, task management, and collaboration tools. 
    For users looking for advanced functionalities like detailed analytics, personalized reminders, or priority support, we offer a premium plan at an affordable price.` },

    { 
      question: 'Can I use the app offline?', 
      answer: `Yes, the app supports offline functionality, allowing you to track your habits, update tasks, and view your progress even when you don't have internet access. 
      Once you’re back online, the app automatically syncs your data to ensure everything stays updated across your devices.`
    },
    { 
      question: 'How secure is my data?', 
      answer: `We take data security very seriously. All your information is encrypted and stored securely in compliance with industry standards. 
      The app uses SSL encryption to protect your data during transmission, and we do not share your data with third parties without your explicit consent.`
    }
];

// TestimonialCarousel Component
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box className={styles.testimonialsCarousel}>
      <Typography variant="h3" className={styles.testimonialsText}>
        What Our Users Say
      </Typography>
      <br />
      <Box className={styles.carouselContainer}>
        <button className={styles.navButton} onClick={handlePrev}>
          &lt;
        </button>
        <Box className={styles.carousel}>
          <Box
            className={styles.testimonialsWrapper}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <Box key={index} className={styles.testimonialCard}>
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className={styles.testimonialImg}
                />
                <Typography variant="h6" className={styles.testimonialName}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" className={styles.testimonialFeedback}>
                  {testimonial.feedback}
                </Typography>
                <Box className={styles.rating}>
                  {'⭐'.repeat(testimonial.rating)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <button className={styles.navButton} onClick={handleNext}>
          &gt;
        </button>
      </Box>
      <Box className={styles.dotsContainer}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </Box>
    </Box>
  );
};


const Homepage = () => {
  const featuresRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleExploreFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
      <br />

      {/* Discover Section */}
      <Box className={styles.discoverSection}>
        <Typography variant="h3" className={styles.discoverTitle}>
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
                <Typography variant="h4" className={styles.sectionTitle}>{section.title}</Typography>
                <Typography variant="body2">{section.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <br/>

      {/* User Testimonials Section */}
      
      <TestimonialCarousel />


          

      {/* FAQ Section */}
      <Box className={styles.faqSection}>
        <Typography variant="h3" className={styles.faqText}>
          Frequently Asked Questions
        </Typography>
        <br/>
        {/* Image Below FAQ Section */}
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop:'7px' }}>
  <img 
    src={require('../assets/qm.png')} 
    alt="FAQ Illustration" 
    style={{ width: '50%', maxWidth: '200px', height: 'auto' }} 
  />
</Box>
<br />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            {faqItems.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ marginBottom: '12px', backgroundColor: '#f8f9fa' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FaQuestionCircle style={{ marginRight: '8px' }} /> {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
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
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
              "& input, & textarea": { color: "white" },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
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
