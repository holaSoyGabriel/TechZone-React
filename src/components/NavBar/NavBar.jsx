/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch, showSearchBar }) => {
    const handleSearchChange = (e) => {
        onSearch?.(e.target.value); // solo si se pasa la función
    };

    return (
        <nav className="navbar">
            <h1 className="logo">TechZone</h1>

            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
            </ul>

            {showSearchBar && (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="¿Qué estás buscando hoy?"
                        onChange={handleSearchChange}
                    />
                </div>
            )}

            <div className="cart-icon">
                <Link to="/cart">🛒</Link>
            </div>
        </nav>
    );
};

export default Navbar;
