// src/pages/Login.js
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import 'animate.css';

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize cookies instance
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });

      // Set the token in cookies
      cookies.set('token', response.data.token, {
        path: '/', // Make cookie available site-wide
        expires: new Date(Date.now() + 86400000), // 1 day expiration
        secure: true, // Use secure flag for HTTPS
        sameSite: 'strict' // Prevent cross-site request forgery
      });

      // Call the login function from AuthContext
      login(response.data.token);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful! Redirecting...');
      navigate('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full transform transition-transform duration-300 hover:scale-105 animate__animated animate__bounce">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out transform focus:-translate-y-1 focus:scale-105"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out transform focus:-translate-y-1 focus:scale-105"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don`t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
};

export default Login;
