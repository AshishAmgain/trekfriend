import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../CSS/RouteDetail.css'; // Add any CSS specific to RouteDetail
import Footer from '../../components/Footer';

const RouteDetail = () => {
  const { routeName } = useParams();
  const navigate = useNavigate();

  // Example data based on routeName. Replace with actual data fetching logic.
  const routeDetails = {
    'manaslu-circuit': {
      title: 'Manaslu Circuit',
      description: 'An adventurous trek around the Manaslu massif.',
      location: 'Gorkha',
    },
    'everest-base-camp': {
      title: 'Everest Base Camp',
      description: 'A trek to the base of the world\'s highest peak.',
      location: 'Solukhumbu',
    },
    'mardi-trek': {
      title: 'Mardi Trek',
      description: 'A lesser-known trek with stunning views.',
      location: 'Kaski',
    },
  };

  const route = routeDetails[routeName] || {};

  const handleMoreInfo = () => {
    // Create a search query for Google
    const query = `${route.title} trek ${route.location}`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    // Redirect to the Google search results
    window.location.href = url;
  };

  return (
    <>
      <div className="route-detail-container">
        <h1>{route.title}</h1>
        <p>{route.description}</p>
        <p><strong>Location:</strong> {route.location}</p>
        <button onClick={handleMoreInfo}>More Info</button>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default RouteDetail;
