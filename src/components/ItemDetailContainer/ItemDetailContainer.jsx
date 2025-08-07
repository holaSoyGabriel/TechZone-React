/** @format */

// src/components/ItemDetailContainer/ItemDetailContainer.jsx

import React, { useEffect, useState } from "react";

const ItemDetailContainer = ({ productId }) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		// Simulando fetch desde Firebase (esto lo reemplazás con tu lógica real)
		const fetchProduct = async () => {
			const mockProduct = {
				id: productId,
				name: "Producto Genial",
				price: 29.99,
				description: "Este producto es increíble y mejora tu vida.",
				image: "/assets/producto-genial.jpg",
			};

			setTimeout(() => setProduct(mockProduct), 500); // Simula carga
		};

		fetchProduct();
	}, [productId]);

	if (!product) return <p>Cargando detalles...</p>;

	return (
		<section className="item-detail">
			<h2>{product.name}</h2>
			<img src={product.image} alt={product.name} />
			<p>{product.description}</p>
			<strong>Precio: ${product.price}</strong>
			<button>Añadir al carrito</button>
		</section>
	);
};

export default ItemDetailContainer;
