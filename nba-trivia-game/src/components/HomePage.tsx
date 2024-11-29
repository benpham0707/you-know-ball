import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'; // For routing
import hennessyImage from './images/hennessy-h23-thefirstpage-gif-image9-final_2880x1540.webp'; // Path to your image

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Main heading */}
      <h1>You Know Ball?</h1>

      {/* Subheading */}
      <h3>Created by Ben Pham</h3>

      {/* Image */}
      <img
        src={hennessyImage}
        alt="LeBron Reading"
        className="homepage-image"
      />

      {/* Start Game button */}
      <Link to="/game">
        <button className="start-button">Start Game</button>
      </Link>
    </div>
  );
};

export default HomePage;
