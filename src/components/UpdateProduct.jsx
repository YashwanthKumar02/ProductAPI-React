
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({ name: '', price: 0, featured: false, rating: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
      setFormData({
        name: response.data.name,
        price: response.data.price,
        featured: response.data.featured,
        rating: response.data.rating,
      });
    } catch (error) {
      console.error('Fetch product error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, formData);
      alert('Product updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Update product error:', error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Featured:</label>
          <input type="checkbox" name="featured" checked={formData.featured} onChange={() => setFormData({ ...formData, featured: !formData.featured })} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
