import React, { useState } from 'react';
import axios from '../api/axios';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
  const [formData, setFormData] = useState({ productId:'', name: '', price: 0, featured: false, rating: 0, company: '' });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === 'rating') {
      value = Math.min(Math.max(parseFloat(value), 0), 5);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productId = uuidv4();
      await axios.post('/products', { ...formData, productId });
      alert('Product added successfully');
      setFormData({ productId: '', name: '', price: 0, featured: false, rating: 0, company: '' });
    } catch (error) {
      console.error('Add product error:', error);
    }
  };

  return (
    <div className='bg-gray-500 text-white w-fit p-4'>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div>
          <label>Name:</label>
          <input className='text-black' type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input className='text-black' type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Featured:</label>
          <input className='text-black' type="checkbox" name="featured" checked={formData.featured} onChange={() => setFormData({ ...formData, featured: !formData.featured })} />
        </div>
        <div>
          <label>Rating:</label>
          <input className='text-black' type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" />
        </div>
        <div>
          <label>Company:</label>
          <input className='text-black' type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <button className='w-fit p-2 bg-white text-black' type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
