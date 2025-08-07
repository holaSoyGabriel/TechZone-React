/** @format */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemCard from "../ItemCard/ItemCard";
import "./FeaturedProducts.css";

// Import dinámico de imágenes locales
const imagenes = import.meta.glob("/src/assets/*.jpg", { eager: true });

const FeaturedProducts = () => {
    const [destacados, setDestacados] = useState([]);

    useEffect(() => {
        const obtenerDestacados = async () => {
            try {
                const productosRef = collection(db, "productos");
                const snapshot = await getDocs(productosRef);
                const productos = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const imagenLocal = imagenes[`/src/assets/${data.imagen}`];
                    return {
                        id: doc.id,
                        ...data,
                        image: imagenLocal?.default || data.imagen,
                    };
                });
                const filtrados = productos.filter((prod) => prod.destacado === true);
                setDestacados(filtrados);
            } catch (error) {
                console.error("Error al cargar productos destacados:", error);
            }
        };

        obtenerDestacados();
    }, []);

    return (
        <section className="featured-products">
            <h2 className="featured-title">Productos destacados</h2>
            <div className="featured-grid">
                {destacados.map((item) => (
                    <ItemCard key={item.id} producto={item} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
