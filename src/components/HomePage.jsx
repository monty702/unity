import "./HomePage.css"
import CardSlider from "./CardSlider";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const HomePage = () => {
    return (
      <div className="home-page">
        <h1>Welcome to Unity Connect</h1>
        <section>
          <CardSlider />
        </section>
        <section>
          <h2>About Us</h2>
          <p>Your donation can change lives. Join us in making a difference today <a href="/about">Click Here...</a></p>
          
        </section>
        <section>
          <h2>Get Involved</h2>
          <p>Join Our Community by subscribing tour social platforms.</p>
          <div className="footer-section social">
           
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
        </section>
      </div>
    );
  };
  
  export default HomePage;
  