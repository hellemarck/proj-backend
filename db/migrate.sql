-- sql code, sqlite db

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    depot INT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS posters (
    id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
);

INSERT INTO posters
    (id, title, image, description)
VALUES
    (1, "Peace", "poster1.jpg", "80x120cm"),
    (2, "Keep your teeth clean", "poster2.jpg", "50x100cm"),
    (3, "Swim for health", "poster3.jpg", "70x130cm"),
    (4, "Keeping up", "poster4.jpg", "60x90cm"),
    (5, "Washington DC", "poster5.jpg", "50x70cm"),
    (6, "Let them grow", "poster6.jpg", "50x70cm"),
    (7, "Scheveningen", "poster7.jpg", "60x90cm"),
    (8, "Montreal 1924", "poster8.jpg", "70x130cm"),
    (9, "BTLM", "poster9.jpg", "60x90"),
    (10, "Like Picasso", "poster10.jpg", "60x90cm")
;
