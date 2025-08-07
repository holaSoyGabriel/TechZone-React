/** @format */

import HeroBanner from "../components/HeroBanner/HeroBanner";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Footer from "../components/Footer/Footer";

import "./Home.css";

const Home = () => {
	return (
		<>
			<div className="home">
				<section className="hero-section">
					<HeroBanner />
				</section>

				<section className="category-section">
                    <h2 className="category-title">Explora por categoría</h2>
					<CategoryGrid />
				</section>

				<section className="featured-section">
					<FeaturedProducts />
				</section>
			</div>
			<Footer />
		</>
	);
};

export default Home;
