import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

const AddReview = () => {
    const { id } = useParams();
    console.log(id)
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");
    const navigate = useNavigate()
    const location = useLocation();

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:3005/api/restaurants/${id}/addReview`, {
                id,
                name,
                review: reviewText,
                rating,
            });
            console.log(response)
            navigate("/");
            navigate(location.pathname);
        } catch(err) {

        }
    }
    return (
        <div className="mb-2">
            <form action="">
                <div className="row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            id="rating"
                            className="form-control"
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        id="Review"
                        className="form-control"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmitReview}
                    className="btn btn-primary mt-3"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddReview