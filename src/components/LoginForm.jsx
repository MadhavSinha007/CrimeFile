import { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-lg transition"
      >
        Login
      </button>
    </form>
  );
}