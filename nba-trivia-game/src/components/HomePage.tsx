import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom'; 
import hennessyImage from './images/hennessy-h23-thefirstpage-gif-image9-final_2880x1540.webp'; 

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <h1>You Know Ball?</h1>
      <h3>Created by Ben Pham</h3>
      <img
        src={hennessyImage}
        alt="LeBron Reading"
        className="homepage-image"
      />
      <Link to="/game">
        <button className="start-button">Start Game</button>
      </Link>
    </div>
  );
};

export default HomePage;
