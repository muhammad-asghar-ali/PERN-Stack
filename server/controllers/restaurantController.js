const db = require('../db')

module.exports.getAllRestaurant = async (req, res) => {
    try {

        // const results = await db.query("SELECT * FROM restaurant")
        const results = await db.query("SELECT * FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant.id = reviews.restaurant_id")

        res.status(200).json({
            status: "Success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.createRestaurant = async (req, res) => {
    try {
        const { name, location, price_range } = req.body

        const results = await db.query("INSERT INTO restaurant(name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [name, location, price_range]);
        res.status(200).json({
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.getRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params
        // const results = await db.query(`SELECT * FROM restaurant where id = ${restaurantId}`)
        const restaurant = await db.query('SELECT * FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant.id = reviews.restaurant_id WHERE id=$1;', [restaurantId])

        // get all reviews by one restaurant

        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [restaurantId])

        res.status(200).json({
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.updateRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params
        const { name, location, price_range } = req.body

        const results = await db.query("UPDATE restaurant SET name = $1, location = $2, price_range = $3  where id = $4 RETURNING *",
            [name, location, price_range, restaurantId])

        res.status(200).json({
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.deleteRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params
        const results = await db.query("DELETE FROM restaurant WHERE id = $1", [restaurantId])
        res.status(200).json({
            data: {
                restaurant: "deleted"
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.addNewReview = async (req, res) => {
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.body.id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
};