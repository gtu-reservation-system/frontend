import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); 
  const searchQuery = new URLSearchParams(location.search).get('search'); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let url = `${API_BASE_URL}/api/restaurants`;
        
        if (searchQuery) {
          url += `?search=${searchQuery}`;
        }

        const response = await axios.get(url);
        setRestaurants(response.data);
      } catch (error) {
        setError('Restaurants could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [searchQuery]); 

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            </li>
          ))
        ) : (
          <p>No restaurants found matching your search.</p>
        )}
      </ul>
    </div>
  );
};

export default Restaurants;

