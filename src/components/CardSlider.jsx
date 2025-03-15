import React, { useState, useEffect } from "react";
import "./CardSlider.css"; // Import CSS for styling

const CardSlider = () => {
  const products = [
    {
      image:
        "https://images.pexels.com/photos/7351636/pexels-photo-7351636.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Scribbers",
      description: "High-quality writing tools for all your needs.",
    },
    {
      image:
        "https://images.pexels.com/photos/7622555/pexels-photo-7622555.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Teethrate",
      description: "The ultimate toothpaste for a brighter smile.",
    },
    {
      image:
        "https://images.pexels.com/photos/5217779/pexels-photo-5217779.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Cleaning Detergent",
      description: "Powerful detergent for spotless cleaning.",
    },
    {
      image:
        "https://images.pexels.com/photos/13882813/pexels-photo-13882813.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Rizzoia Decadmont",
      description: "Luxury fragrance for a sophisticated touch.",
    },
    {
      image:
        "https://images.pexels.com/photos/3958206/pexels-photo-3958206.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Paper Towels",
      description: "Absorbent paper towels for kitchen and home use.",
    },
    {
      image:
        "https://images.pexels.com/photos/8015781/pexels-photo-8015781.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Shampoo",
      description: "Moisturizing shampoo for healthy, shiny hair.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === products.length ? 0 : prevIndex + 1
    );
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Automatically slide to the next card every 3 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [handleNext]);

  return (
    <div className="slider-container">
      <h2>Products</h2>
      <div className="card-slider">
        {/* Previous Button */}
        <button className="slider-btn prev" onClick={handlePrev}>
          &#10094;
        </button>

        {/* Product Card */}
        <div className="card-wrapper">
          <div
            className="card"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="card-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button className="slider-btn next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default CardSlider;