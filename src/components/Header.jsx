import { Link } from "react-router-dom";
import "./Header.css";
import { FaHome, FaAddressBook, FaHandHoldingHeart, FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        event.target !== document.querySelector(".menu-icon")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) { // Ensure it matches the CSS breakpoint
      setIsMenuOpen(false);
    }
  };

  return (
    <header>
      <div className="logo"><img src="unity3.jpg" alt="Logo" /></div>
      <nav className="navbar">
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`} ref={navLinksRef}>
          <li>
            <Link to="/home" onClick={handleLinkClick}>
              <FaHome className="icons" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/donation" onClick={handleLinkClick}>
              <FaHandHoldingHeart className="icons" />
              Donate
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              <FaAddressBook className="icons" />
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleLinkClick}>
              <FaUserCircle className="icons" />
              Profile
            </Link>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      </nav>

    </header>
  );
};

export default Header;
