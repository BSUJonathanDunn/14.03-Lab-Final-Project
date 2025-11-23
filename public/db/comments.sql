CREATE DATABASE IF NOT EXISTS downtowndonut;
USE downtowndonut;

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    rating INT,
    comment LONGTEXT
);

INSERT INTO comments (first_name, last_name, rating, comment) VALUES
('Perry', 'P''uss', 4, 'Donut was good, but made my teeth itch.'),
('Doof', 'Shmirtz', 5, 'If I had a nickle for every donut I''ve eaten I''d have 10.');