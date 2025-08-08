/** @format */

import { useCart } from "../../context/UseCart";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

const Cart = () => {
	const { cart, removeFromCart, total, enableCheckout } = useCart();
	const navigate = useNavigate();

	return (
		<div className={styles.cartContainer}>
			<h2 className={styles.cartTitle}>Carrito</h2>

			{cart.length === 0 ? (
				<p className={styles.emptyCart}>Tu carrito está vacío</p>
			) : (
				cart.map((item) => {
					const cantidad = item.cantidad ?? 1;
					const precioUnitario = item.finalPrice ?? item.precio;

					return (
						<div key={item.id} className={styles.cartItem}>
							<img
								src={item.imagen || "/placeholder.jpg"}
								alt={item.nombre}
								className={styles.productImage}
							/>
							<div className={styles.itemInfo}>
								<p className={styles.itemName}>{item.nombre}</p>
								<p className={styles.itemPrice}>
									{item.discount > 0 ? (
										<>
											<span className={styles.originalPrice}>
												${item.precio.toFixed(2)}
											</span>{" "}
											× {cantidad}
											<br />
											<span className={styles.discountedPrice}>
												${precioUnitario.toFixed(2)} c/u
											</span>
											<br />
											<span className={styles.discountTag}>
												-{item.discount}%
											</span>
										</>
									) : (
										<>
											${item.precio.toFixed(2)} × {cantidad}
										</>
									)}
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
					<button
						className={styles.checkoutButton}
						onClick={() => {
							enableCheckout();
							navigate("/checkout");
						}}
					>
						Finalizar compra
					</button>
				</div>
			)}
		</div>
	);
};

export default Cart;
