/** @format */
import "./HeroBanner.css";

const HeroBanner = () => {
    return (
        <div className="hero-banner">
            <img src="/src/assets/banner.jpg" alt="Promo banner" className="hero-image" />
            <div className="hero-text">
                <h1>Bienvenido a TechZone</h1>
                <p>Descubre las mejores ofertas hoy</p>
            </div>
        </div>
    );
};

export default HeroBanner;
