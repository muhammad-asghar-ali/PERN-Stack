CREATE TABLE
    orders(
        id INT PRIMARY KEY,
        name VARCHAR (255),
        price INT
    );

CREATE TABLE
    restaurant(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR (50) NOT NULL,
        location VARCHAR (50) NOT NULL,
        price_range INT NOT NULL check (
            price_range >= 1
            AND price_range <= 5
        )
    );

INSERT INTO
    restaurant(id, name, location, price_range)
VALUES (123, 'FKC', 'NY', 3);

INSERT INTO
    restaurant(id, name, location, price_range)
VALUES (235, 'Pizza hut', 'DC', 4);

INSERT INTO
    restaurant(name, location, price_range)
VALUES ('Pizza hut', 'DC', 4);

SELECT * FROM restaurant;

CREATE TABLE
    reviews(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        restaurant_id BIGINT NOT NULL REFERENCES restaurant(id),
        name VARCHAR (50) NOT NULL,
        review TEXT NOT NULL,
        rating INT NOT NULL check(
            rating >= 1
            and rating <= 5
        )
    );

DROP TABLE reviews;

INSERT INTO
    reviews(name, review, rating)
VALUES ('john', 'Awesome', 4);

DELETE FROM reviews WHERE id = 1

INSERT INTO
    reviews(restaurant_id, name, review, rating)
VALUES (2, 'john', 'Awesome', 4);

INSERT INTO
    reviews(restaurant_id, name, review, rating)
VALUES (1, 'doe', 'Awesome sdasdasd', 4);

SELECT * FROM reviews;

SELECT * FROM reviews WHERE restaurant_id = 1;

SELECT count(*) FROM reviews;

SELECT count(*) FROM reviews WHERE restaurant_id = 1;

SELECT trunc(AVG(rating), 2) AS avg_rating FROM reviews WHERE restaurant_id = 1;

SELECT location, COUNT(location) FROM  restaurant GROUP BY location;

SELECT restaurant_id, COUNT(restaurant_id) from reviews GROUP BY restaurant_id;

SELECT restaurant_id, trunc(AVG(rating), 2), COUNT(rating) from reviews GROUP BY restaurant_id;

-- JOINS

SELECT * FROM restaurant INNER JOIN reviews ON restaurant.id = reviews.restaurant_id;

SELECT * FROM restaurant FULL OUTER JOIN reviews ON restaurant.id = reviews.restaurant_id;

SELECT * FROM restaurant RIGHT JOIN reviews ON restaurant.id = reviews.restaurant_id;

SELECT * FROM restaurant LEFT JOIN reviews ON restaurant.id = reviews.restaurant_id;

SELECT * FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant.id = reviews.restaurant_id;


SELECT * FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant.id = reviews.restaurant_id WHERE id=1;