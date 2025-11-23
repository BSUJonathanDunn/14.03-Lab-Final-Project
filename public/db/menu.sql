CREATE DATABASE IF NOT EXISTS downtowndonut;
USE downtowndonut;

DROP TABLE IF EXISTS menu;
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donutname VARCHAR(255) NOT NULL,
    typenumber INT,
    typename VARCHAR(255) NOT NULL,
    price DECIMAL(5, 2),
    description VARCHAR(255) NOT NULL
);

INSERT INTO menu (donutname, typenumber, typename, price, description) VALUES
('Glazed Doughnut', 1, 'Classic', 1.25, 'Light and sugary'),
('Chocolate Frosted', 2, 'Frosted', 1.50, 'Chocolate icing on top'),
('Sprinkles', 2, 'Frosted', 1.75, 'Covered with rainbow sprinkles'),
('Boston Cream', 3, 'Filled', 2.25, 'Chocolate glaze with custard'),
('Jelly Filled', 3, 'Filled', 2.00, 'Filled with strawberry jelly');