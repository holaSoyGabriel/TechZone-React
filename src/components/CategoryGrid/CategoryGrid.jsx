/** @format */

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categorygrid.css";

const CategoryGrid = () => {
	const [categorias, setCategorias] = useState([]);
	const [images] = useState(
		import.meta.glob("/src/assets/*.png", { eager: true })
	);

	useEffect(() => {
		const obtenerCategorias = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "productos"));
				const productos = querySnapshot.docs.map((doc) => doc.data());

				const categoriasUnicas = [
					...new Set(productos.map((p) => p.categoria)),
				];

				const categoriasConImagen = categoriasUnicas
					.filter((cat) => typeof cat === "string" && cat.trim() !== "")
					.map((cat) => ({
						nombre: cat,
						image:
							images[`/src/assets/${cat}.png`]?.default ||
							"/src/assets/placeholder.jpg",
					}));

				setCategorias(categoriasConImagen);
			} catch (err) {
				console.error("❌ Error al obtener categorías:", err);
			}
		};

		obtenerCategorias();
	}, []);

	return (
		<div className="category-grid">
			{categorias.map((cat, index) => (
				<CategoryCard
					key={`${cat.nombre}-${index}`}
					nombre={cat.nombre}
					imagen={cat.image}
				/>
			))}
		</div>
	);
};

export default CategoryGrid;
