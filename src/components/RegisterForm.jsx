import { useState } from 'react';

export default function RegisterForm({ onSubmit }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
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
          value={userData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-dark-700 border border-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-lg transition"
      >
        Register
      </button>
    </form>
  );
}