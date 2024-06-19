import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-slate-700 flex justify-center items-center text-white h-14 text-xl">
      <header className="flex flex-col">
        <div className="flex justify-center">
          <Link to="/">Product App</Link>
        </div>
        <nav>
          <ul className="flex justify-center items-center gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            |
            <li>
              <Link to="/all-products">All Products</Link>
            </li>
            |
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
            {isAuthenticated() ? (
              <>
                |
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                |
                <li>
                  <Link to="/login">Login</Link>
                </li>
                |
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
