/** @format */

import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [checkoutReady, setCheckoutReady] = useState(false);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((prod) => prod.id === item.id);

			if (existingItem) {
				return prevCart.map((prod) =>
					prod.id === item.id
						? { ...prod, cantidad: (prod.cantidad ?? 1) + (item.cantidad ?? 1) }
						: prod
				);
			} else {
				return [...prevCart, { ...item, cantidad: item.cantidad ?? 1 }];
			}
		});
	};

	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
		setCheckoutReady(false);
	};

	const enableCheckout = () => setCheckoutReady(true);

	const total = cart.reduce((acc, item) => {
		const cantidad = item.cantidad ?? 1;
		const precioUnitario = item.finalPrice ?? item.precio;
		return acc + precioUnitario * cantidad;
	}, 0);

	return (
		<CartContext.Provider
			value={{
				cart,
				total,
				addToCart,
				removeFromCart,
				clearCart,
				checkoutReady,
				enableCheckout,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
