
import React from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = ({ productId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${productId}`);
      alert('Product deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Delete product error:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => history.push('/')}>Cancel</button>
    </div>
  );
};

export default DeleteProduct;
