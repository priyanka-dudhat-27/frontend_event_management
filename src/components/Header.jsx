/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/Authcontext'; // Ensure this is the correct path and case
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import logo from '../../public/logo4.png'; // Ensure this path is correct

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
        <Link to="/"> <img src={logo} alt="Logo" className="h-12 mr-2 " /></Link>
        
        </div>
        <nav className="space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/create-event" // Link to Create Event page
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Create Event
              </Link>
              <Link
                to="/my-events" // Link to My Events page
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                My Events
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
