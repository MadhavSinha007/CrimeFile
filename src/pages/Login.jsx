import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        navigate('/admin');
      } else {
        throw new Error('Invalid credentials.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm border border-white rounded-2xl p-8 space-y-6 bg-black shadow-2xl"
      >
        <h1 className="text-white text-4xl font-bold tracking-tight uppercase text-center">Login</h1>
        <p className="text-white text-xs tracking-widest text-center">ENTER SECURE AREA</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-white text-sm tracking-wide">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              autoComplete="off"
              value={credentials.username}
              onChange={handleChange}
              className="bg-black border border-white text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-white text-sm tracking-wide">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="bg-black border border-white text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>

          {error && (
            <div className="bg-white text-black text-sm px-4 py-2 rounded-md border border-white">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-white text-black font-bold text-sm py-3 rounded-lg tracking-wider uppercase transition-all hover:bg-transparent hover:text-white border border-white"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-xs">Don’t have an account?</p>
          <motion.button
            onClick={() => navigate('/register')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 w-full border border-white text-white text-sm py-2 rounded-lg uppercase hover:bg-white hover:text-black transition-all font-medium tracking-wide"
          >
            Register Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
