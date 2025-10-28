import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-wide">
          LearnApp
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/courses" className="hover:text-blue-200 dark:hover:text-gray-300 transition-colors">
            Courses
          </Link>

          {user && (
            <span className="text-sm bg-blue-700 dark:bg-gray-700 px-3 py-1 rounded-full">
              {user.email}
            </span>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-blue-700 dark:bg-gray-700 hover:bg-blue-800 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 dark:bg-gray-700 dark:text-white px-4 py-1 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 dark:bg-gray-700 dark:text-white px-4 py-1 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-700 py-3 px-4 space-y-3 animate-slide-down">
          <Link
            to="/courses"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-blue-200 dark:hover:text-gray-300"
          >
            Courses
          </Link>

          {user && (
            <span className="block text-sm bg-blue-800 dark:bg-gray-600 px-3 py-1 rounded-full text-center">
              {user.email}
            </span>
          )}
          
          <button
            onClick={toggleTheme}
            className="w-full p-2 rounded-lg bg-blue-800 dark:bg-gray-600 hover:bg-blue-900 dark:hover:bg-gray-500 transition-colors flex items-center justify-center"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="ml-2">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full bg-white text-blue-700 dark:bg-gray-600 dark:text-white py-1 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-white text-blue-700 dark:bg-gray-600 dark:text-white py-1 rounded-md font-medium hover:bg-blue-100 dark:hover:bg-gray-500 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
