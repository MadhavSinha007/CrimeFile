import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (credentials) => {
    // Fake authentication - in a real app, this would call your backend
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin/admin123 for demo.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      {error && <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg">{error}</div>}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}