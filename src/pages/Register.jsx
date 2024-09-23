/* eslint-disable no-unused-vars */
// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'animate.css';

const Register = () => {
  const [name, setName] = useState(''); // State for name
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name,          
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json' // Ensure the content-type is set
        }
      });

      toast.success('Registration successful! Redirecting...');
      navigate('/');
    } catch (error) {
      setError('Registration failed. Please check your details.');
      toast.error('Registration failed. Please try again.');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full transform transition-transform duration-300 hover:scale-105 animate__animated animate__bounce">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out transform focus:-translate-y-1 focus:scale-105"
              placeholder="Full Name" // Placeholder for the name field
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out transform focus:-translate-y-1 focus:scale-105"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
