// src/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="logo">TechZone</h2>
        <p className="tagline">Innovación que transforma tu espacio</p>
        <div className="socials">
          <a href="#" className="social-link">Instagram</a>
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
        </div>
        <p className="copyright">© 2025 TechZone. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
