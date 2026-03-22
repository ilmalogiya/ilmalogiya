import "./navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { PiMoneyDuotone } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img src={logo} alt="Ilmalogiya logo" />
          <h1>Ilmalogiya</h1>
        </Link>

        <ul className="links">
          <li>
            <Link to="/" className="nav-link">
              <MdOutlineArticle />
              Maqolalar
            </Link>
          </li>
          <li>
            <Link to="/quotes" className="nav-link">
              <FaQuoteRight />
              Iqtiboslar
            </Link>
          </li>
          <li>
            <Link
              to="https://tirikchilik.uz/ilmalogiya"
              className="donat"
              target="_blank"
            >
              <PiMoneyDuotone /> Donat qilish
            </Link>
          </li>
        </ul>

        <div className="burger-menu" onClick={() => setMenuOpen(true)}>
          <GiHamburgerMenu />
        </div>
      </nav>

      {/* Mobil menyu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h3>Bo'limlar</h3>
          <button onClick={() => setMenuOpen(false)} className="close">
            <IoClose />
          </button>
        </div>

        <ul className="mobile-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <MdOutlineArticle /> Maqolalar
            </Link>
          </li>
          <li>
            <Link to="/iqtiboslar" onClick={() => setMenuOpen(false)}>
              <FaQuoteRight /> Iqtiboslar
            </Link>
          </li>
        </ul>

        <div className="menu-footer">
          <Link
            to="https://tirikchilik.uz/ilmalogiya"
            className="donat"
            target="_blank"
            onClick={() => setMenuOpen(false)}
          >
            <PiMoneyDuotone /> Donat qilish
          </Link>
        </div>
      </div>

      {/* Qoraygan fon */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
