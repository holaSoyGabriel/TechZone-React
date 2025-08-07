/** @format */
import { useCart } from "../../context/useCart";

import styles from "./Cart.module.css";

const Cart = () => {
	const { cart, removeFromCart } = useCart();

	// ✅ Evita NaN verificando que item.cantidad exista
	const total = cart.reduce((acc, item) => {
		const cantidad = item.cantidad ?? 1; // Default a 1 si está undefined
		return acc + item.precio * cantidad;
	}, 0);

	return (
		<div className={styles.cartContainer}>
			<h2 className={styles.cartTitle}>🛒 Carrito</h2>

			{cart.length === 0 ? (
				<p className={styles.emptyCart}>Tu carrito está vacío</p>
			) : (
				cart.map((item) => {
					const cantidad = item.cantidad ?? 1;

					return (
						<div key={item.id} className={styles.cartItem}>
							<img
								src={item.image || "/placeholder.jpg"}
								alt={item.nombre}
								className={styles.productImage}
							/>
							<div className={styles.itemInfo}>
								<p className={styles.itemName}>{item.nombre}</p>
								<p className={styles.itemPrice}>
									${item.precio} × {cantidad}
								</p>
							</div>
							<button
								className={styles.removeButton}
								onClick={() => removeFromCart(item.id)}
							>
								Eliminar
							</button>
						</div>
					);
				})
			)}

			{cart.length > 0 && (
				<div className={styles.cartSummary}>
					Total: ${total.toFixed(2)}
					<br />
					<button className={styles.checkoutButton}>Finalizar compra</button>
				</div>
			)}
		</div>
	);
};

export default Cart;
