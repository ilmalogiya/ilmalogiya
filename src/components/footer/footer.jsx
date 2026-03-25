import "./footer.scss";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>© {year} Ilmalogiya. Barcha huquqlar himoyalangan.</p>
            <span>Versiya: 1.1.0</span>
        </footer>
    );
}

export default Footer;