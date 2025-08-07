/** @format */

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemCard from "../ItemCard/ItemCard";
import "./ItemListContainer.css";

const ItemListContainer = ({ searchQuery, categoryFilter }) => {
	const [productos, setProductos] = useState([]);
	const [images] = useState(
		import.meta.glob("/src/assets/*.jpg", { eager: true })
	);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
			const productosFirebase = snapshot.docs.map((doc) => {
				const data = doc.data();

				if (!data.nombre || !data.precio || !data.imagen || !data.categoria) {
					console.warn("Producto inválido en Firebase:", data);
					return null;
				}

				return {
					id: doc.id,
					...data,
					imagen:
						images[`/src/assets/${data.imagen}`]?.default ||
						"/src/assets/placeholder.jpg",
				};
			});

			const productosValidos = productosFirebase.filter((p) => p !== null);
			setProductos(productosValidos);
		});

		return () => unsubscribe();
	}, []);

	const productosFiltrados = productos.filter((p) => {
		const coincideBusqueda = p.nombre
			.toLowerCase()
			.includes(searchQuery?.toLowerCase() || "");

		const coincideCategoria = categoryFilter
			? p.categoria.toLowerCase() === categoryFilter.toLowerCase()
			: true;

		return coincideBusqueda && coincideCategoria;
	});

	return (
    <div className="products-grid">
        {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (
                <ItemCard key={prod.id} producto={prod} />
            ))
        ) : (
            <p className="no-results">No hay productos en esta categoría.</p>
        )}
    </div>
);

};

export default ItemListContainer;
