/** @format */

// src/components/ItemDetailContainer/ItemDetailContainer.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
	const { id } = useParams(); // ← Captura el ID desde la URL
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			// Simulación de producto con ID dinámico
			const mockProduct = {
				id,
				name: "Producto Genial",
				price: 29.99,
				description: "Este producto es increíble y mejora tu vida.",
				image: "/assets/producto-genial.jpg",
			};

			setTimeout(() => setProduct(mockProduct), 500); // Simula carga
		};

		fetchProduct();
	}, [id]);

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
