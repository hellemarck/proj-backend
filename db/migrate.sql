-- sql code, sqlite db

-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    depot INT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS tradings (
    kundid INT NOT NULL,
    object VARCHAR(30) NOT NULL,
    event VARCHAR(5) NOT NULL,
    price VARCHAR(1000) NOT NULL
);

-- INSERT INTO users
--     (depot, email, password)
-- VALUES
--     (300, "test@test.com", "jajaajj"),
--     (4000, "hej@hej.com", "hej");

-- DROP TABLE IF EXISTS posters;
CREATE TABLE IF NOT EXISTS posters (
    id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price INT(3) NOT NULL
);

-- INSERT INTO posters
--     (id, title, image, description, price)
-- VALUES
--     (1, "Swim for health", "poster3.jpg", "70x130cm", 200),
--     (2, "Keeping up", "poster4.jpg", "60x90cm", 210),
--     (3, "Peace", "poster1.jpg", "80x120cm", 225),
--     (4, "Keep your teeth clean", "poster2.jpg", "50x100cm", 250),
--     (5, "Washington DC", "poster5.jpg", "50x70cm", 180),
--     (6, "Let them grow", "poster6.jpg", "50x70cm", 190),
--     (7, "Scheveningen", "poster7.jpg", "60x90cm", 220),
--     (8, "Montreal 1924", "poster8.jpg", "70x130cm", 230),
--     (9, "BTLM", "poster9.jpg", "60x90", 210),
--     (10, "Like Picasso", "poster10.jpg", "60x90cm", 200)
-- ;
