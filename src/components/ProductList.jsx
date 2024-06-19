import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      const productsData = response.data.map(product => ({
        ...product,
        price: typeof product.price === 'object' && product.price.$numberDecimal
          ? parseFloat(product.price.$numberDecimal)
          : product.price,
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Fetch products error:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Delete product error:', error);
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className='p-3 border rounded mb-2'>
            <div>Name: {product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Featured: {product.featured ? 'Yes' : 'No'}</div>
            <div>Rating: {product.rating}</div>
            <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-white p-1 rounded'>Delete</button>
            <Link to={`/product/${product._id}/update`} className='text-blue-500'>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
