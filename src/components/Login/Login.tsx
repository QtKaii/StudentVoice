import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../../api/auth';

const Login: React.FC = () => {
  const { darkMode } = useTheme();
  const { login: authLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await login(email, password);
      if (result.success && result.token) {
        setSuccess(result.message);
        authLogin(result.token);
        // Redirect to home page or dashboard
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    <div className="w-full max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg p-8`}
      >
        <h2 className={`text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome back!
        </h2>
        <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sign in to your StudentVoice account
        </p>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-center text-sm text-green-600">{success}</p>}
        <motion.form 
          className="mt-8 space-y-6" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-t-md relative block w-full px-3 py-2 border ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'
                } placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`appearance-none rounded-b-md relative block w-full px-3 py-2 border ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 text-gray-900'
                } placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                ) : (
                  <Eye className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} rounded focus:ring-blue-500`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </div>
        </motion.form>
        <p className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
);
};

export default Login;

