// src/components/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../auth';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
        navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-gray-500 text-white flex flex-col justify-center items-center w-fit p-4 rounded-lg shadow-md'>
      <h2 className='mb-1'>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div>
          <label>Username:</label>
          <input className='text-black' type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input className='text-black' type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className='bg-black px-2 py-1 rounded-lg mb-2'>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register" className='bg-black px-2 py-1 rounded-lg'>Register</Link></p>
    </div>
  );
};

export default Login;
