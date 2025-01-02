import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fewa from '../../Assets/fewa.jpg';
import manaslu2 from '../../Assets/manaslu.jpg';
import manaslu from '../../Assets/manaslu.jpg';
import rara from '../../Assets/rara.jpg';
import '../../CSS/Destination.css';
import Footer from '../../components/Footer';

const Destination = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      name: 'Manaslu Trek',
      image: manaslu,
      location: 'Gorkha',
      description: 'Manaslu is known for its breathtaking views of snow-capped peaks.',
      details: 'Manaslu Trek is a mesmerizing trail in the Gorkha region. It offers stunning vistas of the Himalayas, rich cultural heritage, and challenging routes for trekking enthusiasts.',
    },
    {
      name: 'Rara Lake',
      image: rara,
      location: 'Mugu',
      description: 'Rara Lake is the largest lake in Nepal, surrounded by lush greenery.',
      details: 'Rara Lake is a serene paradise in the Mugu district. Known as the Queen of Lakes, it offers a tranquil environment with diverse flora and fauna.',
    },
    {
      name: 'Pokhara',
      image: fewa,
      location: 'Nepal',
      description: 'Pokhara is famous for its serene lakes and stunning mountain views.',
      details: 'Pokhara, the City of Lakes, is a popular destination for adventure and relaxation. It is the gateway to the Annapurna Circuit and offers picturesque views of the Himalayas.',
    },
    {
      name: 'Mountains',
      image: manaslu2,
      location: 'Nepal',
      description: 'Explore the majestic mountains of Nepal, a trekker’s paradise.',
      details: 'The mountains of Nepal offer unmatched trekking experiences. From the Everest Base Camp to the Annapurna Circuit, it’s a haven for adventure seekers.',
    },
  ];

  const handleMoreInfo = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDetails = () => {
    setSelectedDestination(null);
  };

  return (
    <>
      <div className="destination-container">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Explore Nepal</h1>
            <p>Find your next adventure</p>
          </div>
        </div>

        <div className="search-section">
          <input type="text" placeholder="Search for Destinations" className="search-bar" />
          <button className="search-button">Search</button>
        </div>

        <div className="destinations-section">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-info">
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <p className="description">{destination.description}</p>
                <button onClick={() => handleMoreInfo(destination)}>More...</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <div className="details-modal">
          <div className="details-content">
            <h2>{selectedDestination.name}</h2>
            <p>{selectedDestination.details}</p>
            <button onClick={closeDetails} className="close-button">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Destination;
