import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Example login API call (replace with your real API)
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      // Assume the response contains a token
      const { token } = response.data;

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('token', token);

      // Redirect to the protected route (e.g., admin dashboard)
      navigate('/'); // Replace with your actual route

    } catch (error) {
      // Handle error if login fails
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
