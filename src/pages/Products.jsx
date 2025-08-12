/** @format */

import { useParams } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import "./Products.css";

const Products = ({ setSearchQuery }) => {
	const { categoryId } = useParams();
	const categoriasValidas = ["electronica", "gadgets", "gaming"];
	const categoriaValida = categoriasValidas.includes(categoryId?.toLowerCase());

	return (
		<main className="products">
			<h1 className="products-title neon-text">
				{categoryId
					? categoriaValida
						? `Categoría: ${categoryId}`
						: `Categoría no válida: ${categoryId}`
					: "Todos los productos"}
			</h1>

			{categoriaValida || !categoryId ? (
				<ItemListContainer
					searchQuery={setSearchQuery}
					categoryFilter={categoryId}
				/>
			) : (
				<p className="no-results">
					La categoría <strong>{categoryId}</strong> no existe.
				</p>
			)}
		</main>
	);
};

export default Products;
