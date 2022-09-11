import axios from 'axios';
import React, { useState, useContext } from 'react'
import { RestaurantContext } from '../context/RestaurantContext'

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:3005/api/restaurants", {
            name,
            location,
            price_range: priceRange,
          });
          console.log(response.data.data);
          addRestaurants(response.data.data.restaurant);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <div className='mb-4'>
            <form action="">
                <div className="row">
                    <div className="col">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder='name' />
                    </div>
                    <div className="col">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder='location' />
                    </div>
                    <div className="col">
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)} 
                            className='form-select'>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-primary form-control">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant