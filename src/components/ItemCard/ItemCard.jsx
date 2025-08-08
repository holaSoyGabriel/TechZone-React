/** @format */

import React from "react";
import "./ItemCard.css";
import { useCart } from "../../context/useCart";
import Swal from "sweetalert2";

const ItemCard = ({ producto }) => {
	const { addToCart } = useCart();

	if (!producto || typeof producto !== "object") {
		return <p className="error">❌ Producto inválido</p>;
	}

	const { nombre, descripcion, precio, imagen, discount = 0 } = producto;

	if (!nombre || !precio || !imagen) {
		return (
			<div className="product-card error-card">
				<p>⚠️ Datos incompletos para este producto.</p>
			</div>
		);
	}

	const precioFinal = discount > 0 ? precio * (1 - discount / 100) : precio;

	const handleAddToCart = () => {
		const productoConDescuento = {
			...producto,
			finalPrice: parseFloat(precioFinal.toFixed(2)),
			cantidad: 1,
		};

		addToCart(productoConDescuento);

		Swal.fire({
			title: "¡Agregado!",
			text: `${nombre} fue añadido al carrito.`,
			icon: "success",
			confirmButtonColor: "#00ffcc",
			background: "#121212",
			color: "#fff",
			timer: 1500,
			showConfirmButton: false,
		});
	};

	return (
		<div className="product-card">
			<img src={imagen} alt={nombre} />
			<div className="product-info">
				<h3>{nombre}</h3>
				<p className="description">{descripcion}</p>
				<div className="product-footer">
					{discount > 0 ? (
						<div className="price-group">
							<span className="price-original">${precio.toFixed(2)}</span>
							<span className="price-discounted">
								${precioFinal.toFixed(2)}
							</span>
							<span className="discount-tag">-{discount}%</span>
						</div>
					) : (
						<span className="price">${precio.toFixed(2)}</span>
					)}
					<button onClick={handleAddToCart}>Agregar</button>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
