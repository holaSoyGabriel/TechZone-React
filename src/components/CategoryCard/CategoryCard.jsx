/** @format */

import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ nombre, imagen }) => {
    return (
        <Link to={`/products/${nombre}`} className="category-card">
            <img src={imagen} alt={`Categoría ${nombre}`} />
            <h3>{nombre}</h3>
        </Link>
    );
};

export default CategoryCard;
