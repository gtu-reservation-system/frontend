import React from 'react';
import { useParams } from 'react-router-dom';

const Restaurant = () => {
  const { id } = useParams(); 

  const details = {
    1: { name: "Restaurant 1", description: "Details of Restaurant 1" },
    2: { name: "Restaurant 2", description: "Details of Restaurant 2" },
  };

  const restaurant = details[id];

  if (!restaurant) {
    return <h2>Restaurant not found</h2>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default Restaurant;
