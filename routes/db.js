import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new pg.Client({
  connectionString: process.env.DB_CONNECTIONSTRING,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});


/*

To Run this code on your local machine create the following tables and insert the products in the products table ALL QUERY LISTED BELOW

run npm i to install all node modules

create a dotenv and set the value according your credentials
or 
hard code the credential when downloaded the file on your machine in auth.js index.js and db.js

DB_USER=ONLYIKNOWTHIS
DB_HOST=ONLYIKNOWTHIS
DB_NAME=ONLYIKNOWTHIS
DB_PASSWORD=ONLYIKNOWTHIS
DB_PORT=5432
PORT= 3000
SESSION_SECRET= ONLYIKNOWTHIS

Create Users table in the database --
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

Create products table in the database --
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(50)
);

INSERT INTO products (id, title, price, image, category) 
VALUES
(1, 'Simple Necklace', 79.99, '/images/Necklace/Necklace1.jpg', 'necklace'),
(2, 'Star Necklace', 99.99, '/images/Necklace/Necklace2.jpg', 'necklace'),
(3, 'Pearl Necklace', 119.99, '/images/Necklace/Necklace3.jpg', 'necklace'),
(4, 'Layered Necklace', 89.99, '/images/Necklace/Necklace4.jpg', 'necklace'),
(5, 'Stone Necklace', 149.99, '/images/Necklace/Necklace5.jpg', 'necklace'),
(6, 'Flower Necklace', 199.99, '/images/Necklace/Necklace6.jpg', 'necklace'),
(7, 'Lomg Necklace', 79.99, '/images/Necklace/Necklace7.jpg', 'necklace'),
(8, 'Wing Necklace', 89.99, '/images/Necklace/Necklace8.jpg', 'necklace'),
(9, 'Simple Gold necklace', 99.99, '/images/Necklace/Necklace9.jpg', 'necklace'),
(10, 'Multi Stone Necklace', 119.99, '/images/Necklace/Necklace10.jpg', 'necklace'),
(11, 'RoseGold Necklace', 79.99, '/images/Necklace/Necklace11.jpg', 'necklace'),
(12, 'Silver Necklace', 59.99, '/images/Necklace/Necklace12.jpg', 'necklace'),
(13, 'Twist Rose Gold Earrings', 99.99, '/images/Rings/Ring1.jpg', 'rings'),
(14, 'Open Circle ring', 119.99, '/images/Rings/Ring2.jpg', 'rings'),
(15, 'Tri Tone Rolling Ring', 229.99, '/images/Rings/Ring3.jpg', 'rings'),
(16, 'Wave Style Ring', 199.99, '/images/Rings/Ring4.jpg', 'rings'),
(17, 'Emerald Cut Ring', 269.99, '/images/Rings/Ring5.jpg', 'rings'),
(18, 'Pink Sapphire Ring', 399.99, '/images/Rings/Ring6.jpg', 'rings'),
(19, 'Diamond Cluster Ring', 199.99, '/images/Rings/Ring7.jpg', 'rings'),
(20, 'Blue Ruby Silver Diamond Ring', 149.99, '/images/Rings/Ring8.jpg', 'rings'),
(21, 'Wide Torc Ring', 349.99, '/images/Rings/Ring9.jpg', 'rings'),
(22, 'Wave Delicate Ring', 149.99, '/images/Rings/Ring10.jpg', 'rings'),
(23, 'Vintage Ring', 199.99, '/images/Rings/Ring11.jpg', 'rings'),
(24, 'Pave Sapphire Dimond Band', 499.99, '/images/Rings/Ring12.jpg', 'rings'),
(25, 'RoseGold Earrings', 39.99, '/images/Earrings/Earring1.jpg', 'earrings'),
(26, 'Gold Hoops', 129.99, '/images/Earrings/Earring2.jpg', 'earrings'),
(27, 'Gold Droplet Hoops', 89.99, '/images/Earrings/Earring3.jpg', 'earrings'),
(28, 'Pearl Earrings', 149.99, '/images/Earrings/Earring4.jpg', 'earrings'),
(29, 'Labradorite Heart Shaped Earring', 89.99, '/images/Earrings/Earring5.jpg', 'earrings'),
(30, 'Ribbed Chunky Hoop Earring', 49.99, '/images/Earrings/Earring6.jpg', 'earrings'),
(31, 'Single Hoop Double Chain Earring', 119.99, '/images/Earrings/Earring7.jpg', 'earrings'),
(32, 'Square Sparkle Hoop Earring', 119.99, '/images/Earrings/Earring8.jpg', 'earrings'),
(33, 'Circle Stud Earring', 79.99, '/images/Earrings/Earring9.jpg', 'earrings'),
(34, 'Rose Earring - Gold', 99.99, '/images/Earrings/Earring10.jpg', 'earrings'),
(35, 'Crystal Stud Earring', 139.99, '/images/Earrings/Earring11.jpg', 'earrings'),
(36, 'Feather Hoop Earring', 129.99, '/images/Earrings/Earring12.jpg', 'earrings');



CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    title VARCHAR(255),
    price NUMERIC(10, 2),
    image VARCHAR(255),
    quantity INT,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES users(id),
    CONSTRAINT fk_product
      FOREIGN KEY(product_id)
      REFERENCES products(id)
);


*/

const db = {
  query: (text, params) => client.query(text, params),
};

export default db;
