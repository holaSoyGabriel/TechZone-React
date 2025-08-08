/** @format */

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { assignRandomDiscounts } from "../utils/discountUtils.jsx";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import "./Products.css";

const Products = ({ setSearchQuery }) => {
    const { categoryId } = useParams();
    const categoriasValidas = ["electronica", "gadgets", "gaming"];
    const categoriaValida = categoriasValidas.includes(categoryId?.toLowerCase());

    useEffect(() => {
        const lastUpdate = localStorage.getItem("lastDiscountUpdate");
        const now = Date.now();

        // Ejecutar solo si han pasado más de 6 horas
        if (!lastUpdate || now - lastUpdate > 1000 * 60 * 60 * 6) {
            assignRandomDiscounts()
                .then(() => {
                    localStorage.setItem("lastDiscountUpdate", now);
                    console.log("🎯 Descuentos actualizados");
                })
                .catch((error) => {
                    console.error("❌ Error al asignar descuentos:", error);
                });
        }
    }, []);

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
