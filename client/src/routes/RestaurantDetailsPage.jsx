import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import Reviews from '../components/Reviews';
import AddReview from "../components/AddReview"
import StarRating from '../components/StarRating'

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/restaurants/${id}`);
        console.log(response.data.data);
        // both restaurant and reviews
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setSelectedRestaurant, id]);

  return (
    <div>
      {selectedRestaurant &&
        <>
          <h3 className="text-center display-1">{selectedRestaurant.restaurant.name}</h3>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.avg_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>}
    </div>
  )
}

export default RestaurantDetailsPage