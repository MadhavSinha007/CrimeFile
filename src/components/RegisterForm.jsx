// app/register/page.tsx or RegisterPage.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data) => {
    setIsLoading(true);
    // simulate delay
    setTimeout(() => {
      console.log('Registered:', data);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-extrabold tracking-wider uppercase text-center">
          Register
        </h1>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </main>
  );
}

function RegisterForm({ onSubmit, isLoading }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = 'Name is required';
    if (!userData.username.trim()) newErrors.username = 'Username is required';
    if (!userData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (userData.password.length < 6) newErrors.password = 'At least 6 characters';
    if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { label: 'FULL NAME', name: 'name', type: 'text' },
        { label: 'EMAIL', name: 'email', type: 'email' },
        { label: 'USERNAME', name: 'username', type: 'text' }
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label htmlFor={name} className="text-xs mb-1 block tracking-wider">
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={userData[name]}
            onChange={handleChange}
            className={`w-full bg-black border ${
              errors[name] ? 'border-red-500' : 'border-white'
            } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500`}
            required
          />
          {errors[name] && <p className="text-sm text-red-400 mt-1">{errors[name]}</p>}
        </div>
      ))}

      {['password', 'confirmPassword'].map((name, idx) => (
        <div key={name}>
          <label htmlFor={name} className="text-xs mb-1 block tracking-wider">
            {name === 'password' ? 'PASSWORD' : 'CONFIRM PASSWORD'}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id={name}
              name={name}
              value={userData[name]}
              onChange={handleChange}
              className={`w-full bg-black border ${
                errors[name] ? 'border-red-500' : 'border-white'
              } text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-white"
            >
              {showPassword ? '👁‍🗨' : '🙈'}
            </button>
          </div>
          {errors[name] && <p className="text-sm text-red-400 mt-1">{errors[name]}</p>}
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${
          isLoading
            ? 'bg-gray-700 text-white'
            : 'bg-white text-black hover:bg-black hover:text-white border border-white'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Registering...
          </div>
        ) : (
          'REGISTER'
        )}
      </motion.button>
    </form>
  );
}
