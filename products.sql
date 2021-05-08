USE sdcproducts;


-- DROP TABLE IF EXISTS products;
-- -- DROP TABLE styles;
-- -- DROP TABLE related;
-- -- DROP TABLE features;
-- -- DROP TABLE skus;

-- -- -- DROP SCHEMA sdcproducts;
-- -- -- CREATE SCHEMA sdcproducts;

-- CREATE TABLE products (
--   id INT UNIQUE PRIMARY KEY,
--   name varchar(200),
--   slogan varchar(1000),
--   description varchar(2000),
--   category varchar(200),
--   default_price varchar(50)
-- );

-- LOAD DATA LOCAL INFILE './data/product.csv' INTO TABLE products
-- FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY "\n"
-- IGNORE 1 LINES
-- (@id, @name, @slogan, @description, @category, @price)
-- SET id = NULLIF(@id, ''),
--     name = NULLIF(@name, ''),
--     slogan = NULLIF(@slogan, ''),
--     description = NULLIF(@description, ''),
--     category = NULLIF(@category, ''),
--     default_price = NULLIF(@price, '');

-- -- update the products table

-- UPDATE products
--   SET default_price = category, category = description, description = slogan, slogan = '' WHERE default_price IS NULL;


-- styles

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id int PRIMARY KEY,
  productId int,
  name varchar(200),
  sale_price varchar(25),
  original_price varchar(25),
  default_style int
);

ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (id);

LOAD DATA LOCAL INFILE './data/styles.csv' INTO TABLE styles
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY "\n"
IGNORE 1 LINES
(@id, @productId, @name, @sale_price, @original_price, @default_style)
SET id = NULLIF(@id, ''),
    productId = NULLIF(@productId, ''),
    name = NULLIF(@name, ''),
    sale_price = NULLIF(@sale_price, ''),
    original_price = NULLIF(@original_price, ''),
    default_style = NULLIF(@default_style, '');


-- related
DROP TABLE IF EXISTS styles;

CREATE TABLE related (
  id int PRIMARY KEY,
  current_product_id int,
  related_product_id int
);

ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (id);

-- CREATE TABLE features (
--   id int PRIMARY KEY,
--   productId int,
--   feature varchar(100),
--   value varchar(100)
-- );

-- CREATE TABLE skus (
--   id int PRIMARY KEY,
--   styleId int,
--   size varchar(10),
--   quantity int
-- );

-- COPY products
-- FROM '/Users/jakenalls/Desktop/rfe2/products-api/data/product.csv'
-- DELIMITER ','
-- CSV HEADER;

