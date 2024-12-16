import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './LoginPage.module.css'; // Custom styles for additional CSS

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
      }}
    >
      {/* Left Section - Form */}
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Sign in to your account
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Welcome back!
        </Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            navigate('/dashboard');
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ width: '100%', maxWidth: '400px' }}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                margin="normal"
                InputProps={{ style: { color: '#fff', borderColor: '#6f42c1' } }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                fullWidth
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                margin="normal"
                InputProps={{ style: { color: '#fff' } }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Typography
                variant="caption"
                sx={{ display: 'block', textAlign: 'right', marginBottom: '1rem', color: '#aaa' }}
              >
                <Link href="#" color="inherit">
                  Forgot Password?
                </Link>
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#6f42c1',
                  color: '#fff',
                  padding: '0.8rem',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#5a3496' },
                }}
              >
                Sign In
              </Button>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', marginTop: '2rem', color: '#aaa' }}
              >
                No account?{' '}
                <Link href="/register" underline="none" sx={{ color: '#6f42c1', fontWeight: 'bold' }}>
                  Create one
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Right Section - Illustration */}
      <Box
        sx={{
          width: '50%',
          backgroundColor: '#8c52ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/party-llama-with-balloons-6304796-5187184.png"
          alt="Llama Illustration"
          style={{
            width: '60%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;