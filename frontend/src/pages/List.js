import React from 'react';
import { Link } from 'react-router-dom';

const Restaurants = () => {
  const restaurantList = [
    { id: 1, name: "Restaurant 1" },
    { id: 2, name: "Restaurant 2" },

  ];

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurantList.map((restaurant) => (
          <li key={restaurant.id}>

            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;
