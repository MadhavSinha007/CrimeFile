import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  const handleRegister = (userData) => {
    // Fake registration - in a real app, this would call your backend
    console.log('Registered:', userData);
    setSuccess('Registration successful! You can now login.');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">Register New Admin</h1>
      {success && <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg">{success}</div>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}