import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import RegisterImg from './register.png';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Send POST request to register endpoint
      const response = await axios.post('http://localhost:5000/register', values);

      // Handle success
      alert(response.data.message || 'Registration successful!');
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      setSubmitting(false);

      // Handle server-side validation errors
      if (error.response && error.response.data.message) {
        setFieldError('email', error.response.data.message);
      } else {
        console.error('Registration error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        {/* Add Register Icon here */}
        <img src={RegisterImg}alt="Register Icon" className={styles.icon} />
      </div>
      
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Register</h1>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleRegister(values, actions)}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={`${styles.input} ${touched.name && errors.name ? styles.errorInput : ''}`}
                />
                {touched.name && errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${touched.email && errors.email ? styles.errorInput : ''}`}
                />
                {touched.email && errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`${styles.input} ${touched.password && errors.password ? styles.errorInput : ''}`}
                />
                {touched.password && errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
              <div className={styles.redirectText}>
                Already have an account?{' '}
                <Link to="/login" className={styles.redirectLink}>Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
