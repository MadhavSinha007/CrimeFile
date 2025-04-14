// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const handleRegister = (userData) => {
    console.log('Registered:', userData);
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">Register New Admin</h1>
          <p className="text-sm text-gray-400 mt-2">Fill in the details to create an account</p>
        </div>

        {success && (
          <div className="bg-green-500/10 text-green-400 border border-green-500/30 text-sm p-3 rounded-lg text-center">
            {success}
          </div>
        )}

        <RegisterForm onSubmit={handleRegister} />
      </div>
    </main>
  );
}
