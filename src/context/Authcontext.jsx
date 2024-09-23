/* eslint-disable no-unused-vars */
// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    setUser({ token });
    cookies.set('token', token, { path: '/' });
  };

  const logout = () => {
    setUser(null);
    cookies.remove('token', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
