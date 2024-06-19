// src/components/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../auth'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.password);
      navigate('/login'); // Redirect to login page upon successful registration
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-500 text-white flex flex-col justify-center items-center w-fit p-4 rounded-lg shadow-md">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label>Username:</label>
          <input
            className="text-black"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="text-black"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-black px-2 py-1 rounded-lg mb-2">
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
