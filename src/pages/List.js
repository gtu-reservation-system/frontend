import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let url = `${API_BASE_URL}/api/restaurants`;
        const searchQuery = new URLSearchParams(location.search).get('search');
        
        if (searchQuery) {
          url += `?search=${searchQuery}`;
          setSearchTerm(searchQuery);
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
  }, [location.search]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }
    
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-container">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Static Image Background */}
        <div className="hero-background">
          <img 
            src="/foods.jpg" 
            alt="Restaurant background" 
            className="hero-image"
          />
          {/* Overlay for better text visibility */}
          <div className="hero-overlay"></div>
        </div>

        {/* Search Container */}
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Restoran ara"
              className="search-input"
            />
            <button type="submit" className="search-button">
              Ara
            </button>
          </form>
        </div>
      </div>

      {/* Restaurants Grid Section */}
      <div className="content-section">
        <div className="restaurants-grid">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                to={`/restaurants/${restaurant.id}`}
                key={restaurant.id}
                className="restaurant-card"
              >
                <div className="restaurant-image-wrapper">
                  <img
                    src={restaurant.logoPhotoPath}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                </div>
                <div className="restaurant-name">{restaurant.name}</div>
              </Link>
            ))
          ) : (
            <div className="no-results">Restoran bulunamadı.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
