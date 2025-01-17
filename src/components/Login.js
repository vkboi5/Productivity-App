import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';
import loginImg from './login.png'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:5000/login', values);

      // Extract token from response
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setSubmitting(false);

      // Handle error cases
      if (error.response && error.response.data.message) {
        setFieldError('email', error.response.data.message); // Show error message under email field
      } else {
        console.error('Login error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Section - Form */}
      <div className={styles.formSection}>
        <h2 className={styles.heading}>Sign in to your account</h2>
        <p className={styles.subheading}>Welcome back!</p>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleLogin(values, actions)}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email" style={{color:"white"}}>Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${
                    touched.email && errors.email ? styles.errorInput : ''
                  }`}
                />
                {touched.email && errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" style={{color:"white"}}>Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`${styles.input} ${
                    touched.password && errors.password ? styles.errorInput : ''
                  }`}
                />
                {touched.password && errors.password && (
                  <div className={styles.errorMessage}>{errors.password}</div>
                )}
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
              <p className={styles.signupText}>
                No account? <a href="/register">Create one</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      {/* Right Section - Illustration */}
      <div className={styles.illustrationSection}>
        <img
          src={loginImg}
          alt="Llama Illustration"
          className={styles.illustration}
        />
      </div>
    </div>
  );
};

export default Login;
