/** @format */

import React from "react";
import "./ItemCard.css";
import { useCart } from "../../context/useCart";

const ItemCard = ({ producto }) => {
    const { addToCart } = useCart();

    // 🔒 Validación de datos
    if (!producto || typeof producto !== "object") {
        return <p className="error">❌ Producto inválido</p>;
    }

    const { nombre, descripcion, precio, imagen } = producto;

    if (!nombre || !precio || !imagen) {
        return (
            <div className="product-card error-card">
                <p>⚠️ Datos incompletos para este producto.</p>
            </div>
        );
    }

    return (
        <div className="product-card">
            <img src={imagen} alt={nombre} />
            <div className="product-info">
                <h3>{nombre}</h3>
                <p className="description">{descripcion}</p>
                <div className="product-footer">
                    <span className="price">${precio}</span>
                    <button onClick={() => addToCart(producto)}>Agregar</button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
