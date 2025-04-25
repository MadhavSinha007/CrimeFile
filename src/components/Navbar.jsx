import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CrimeWiseLogo from '../assets/CrimeWiseLogo.png';

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <motion.img
              src={CrimeWiseLogo}
              alt="CrimeWise Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.3, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 150 }}
            />
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/search"
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium uppercase text-sm tracking-wider"
            >
              Case Database
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/aisearch"
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium uppercase text-sm tracking-wider"
            >
              AI SEARCH
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-sm transition-all duration-200 font-medium border border-gray-700 uppercase text-sm tracking-wider"
            >
              Agent Portal
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-400 hover:text-white focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}