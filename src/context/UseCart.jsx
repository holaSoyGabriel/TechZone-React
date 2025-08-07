/** @format */
import { useContext } from "react";
import { CartContext } from "./CartContext"; // Asegurate de que el path sea correcto

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }

    return context;
};
