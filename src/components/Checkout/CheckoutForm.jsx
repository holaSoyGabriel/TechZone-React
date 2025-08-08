/** @format */

import React, { useState } from "react";
import { useCart } from "../../context/useCart";
import { db } from "../../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", direccion: "" });
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [consent, setConsent] = useState(false);
    const { cart, total, clearCart, checkoutReady } = useCart();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const sendEmail = async () => {
        const templateParams = {
            nombre: form.nombre,
            correo: form.correo,
            direccion: form.direccion,
            total: `$${total.toFixed(2)}`
        };

        try {
            await emailjs.send(
                "tu_service_id",     
                "tu_template_id",    
                templateParams,
                "tu_public_key"     
            );
            console.log("Correo enviado con éxito");
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orden = {
            cliente: form,
            items: cart,
            total,
            fecha: Timestamp.now(),
        };

        try {
            const docRef = await addDoc(collection(db, "ordenes"), orden);
            setOrderId(docRef.id);
            await sendEmail(); 
            clearCart();
        } catch (error) {
            console.error("Error al generar la orden:", error);
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div className={styles.confirmation}>
                <h2>¡Gracias por tu compra!</h2>
                <p>
                    Tu ID de orden es: <strong>{orderId}</strong>
                </p>
                <p className={styles.successGlow}>
                    Revisa tu correo para más detalles.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.checkoutContainer}>
            <h2 className={styles.title}>🛒 Finalizar Compra</h2>

            <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="correo">Correo</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                    placeholder="Dirección de entrega"
                />
            </div>

            <div className={styles.consentContainer}>
                <label>
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                    />
                    Confirmo que esta compra es una simulación y no genera una transacción
                    real.
                </label>
            </div>

            <p className={styles.total}>
               Total: <strong>${total.toFixed(2)}</strong>
            </p>

            <button
                type="submit"
                className={
                    !checkoutReady || !consent || loading
                        ? styles.btnDisabled
                        : styles.btnNeon
                }
                disabled={!checkoutReady || !consent || loading}
                title={
                    !checkoutReady
                        ? "Debes finalizar la compra desde el carrito"
                        : !consent
                        ? "Debes confirmar que es una simulación"
                        : loading
                        ? "Procesando orden..."
                        : ""
                }
            >
                {loading ? "Procesando..." : "Confirmar Pedido"}
            </button>
        </form>
    );
};

export default CheckoutForm;
