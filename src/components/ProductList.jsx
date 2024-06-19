import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, featuredOnly, maxPrice, minRating]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('products/');
      const { data } = response;
      console.log('Fetched products:', data);
      if (!Array.isArray(data)) {
        throw new Error(`Expected array data, but received: ${JSON.stringify(data)}`);
      }

      const processedProducts = data.map(product => ({
        ...product,
        price: parseFloat(product.price), // Assuming price is already a number
        rating: parseFloat(product.rating.$numberDecimal) // Convert Decimal128 to number
      }));

      setProducts(processedProducts);
    } catch (error) {
      console.error('Fetch products error:', error.message);
      // Handle error state or display an error message to the user
    }
  };

  const applyFilters = () => {
    let filtered = products;

    if (featuredOnly) {
      filtered = filtered.filter(product => product.featured);
    }

    if (maxPrice !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }

    if (minRating !== '') {
      filtered = filtered.filter(product => product.rating >= parseFloat(minRating));
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`products/${productId}`);
      fetchProducts(); // Optionally, re-fetch products after deletion
    } catch (error) {
      console.error('Delete product error:', error);
      // Handle delete error
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      
      {/* Filter Controls */}
      <div className='bg-gray-700 flex items-center justify-center gap-3 h-14 text-white'>
      <div>
        <label>
          <input type="checkbox" checked={featuredOnly} onChange={() => setFeaturedOnly(!featuredOnly)} />
          Featured Only
        </label>
      </div>
      <div>
        <label>
          Max Price:
          <input className="text-black" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Min Rating:
          <input className="text-black" type="number" step="0.1" value={minRating} onChange={(e) => setMinRating(e.target.value)} />
        </label>
      </div>
      </div>

      {/* Product List */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product._id}>
            <div>Name: {product.name}</div>
            <div>Price: ${product.price.toFixed(2)}</div>
            <div>Featured: {product.featured ? 'Yes' : 'No'}</div>
            <div>Rating: {product.rating}</div>
            <button onClick={() => handleDelete(product._id)} className='bg-black px-2 py-1 rounded-lg mb-2 text-white'>Delete</button>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
