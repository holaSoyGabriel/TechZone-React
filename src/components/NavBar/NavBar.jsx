/** @format */

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = ({ onSearch, showSearchBar }) => {
    const { cart } = useContext(CartContext);
    const location = useLocation();

    const handleSearchChange = (e) => {
        onSearch?.(e.target.value);
    };

    const isCheckoutDisabled = cart.length === 0;

    return (
        <nav className="navbar">
            <h1 className="logo">TechZone</h1>

            <ul className="nav-links">
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Inicio</Link></li>
                <li><Link to="/products" className={location.pathname === "/products" ? "active" : ""}>Productos</Link></li>
                <li>
                    <Link
                        to={isCheckoutDisabled ? "#" : "/checkout"}
                        className={`checkout-link ${isCheckoutDisabled ? "disabled" : ""} ${location.pathname === "/checkout" ? "active" : ""}`}
                        onClick={(e) => {
                            if (isCheckoutDisabled) e.preventDefault();
                        }}
                    >
                        Checkout
                    </Link>
                </li>
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
