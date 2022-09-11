import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating'

// import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/restaurants")
        setRestaurants(response.data.data.restaurants)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchData()
  }, [setRestaurants])

  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation();
      await axios.delete(`http://localhost:3005/api/restaurants/${id}`)
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id
      }))
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleUpdate = async (e, id) => {
    try {
      e.stopPropagation();
      navigate(`restaurant/${id}/update`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleRestaurantSelect = (id) => {
    try {
      navigate(`restaurant/${id}`)
    } catch (err) {
      console.log(err.message)
    }
  }
  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.id} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };


  return (
    <div className='list-group'>
      <table className='table table-hover'>
        <thead>
          <tr className='bg-primary text-white'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map(restaurant => {
            return (
              <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  )
}

export default RestaurantList