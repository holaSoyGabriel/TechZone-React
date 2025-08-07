/** @format */

const Item = ({ producto }) => {
	return (
		<li>
			<img src={producto.image} alt={producto.name} width="150" />
			<h3>{producto.name}</h3>
			<p>${producto.price}</p>
			<button>Agregar al carrito</button>
		</li>
	);
};

export default Item;
