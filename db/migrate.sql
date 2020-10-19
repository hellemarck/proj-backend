-- sql code, sqlite db

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    depot INT,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS posters (
    id NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
);

INSERT INTO posters
    (title, image, description)
VALUES
    ("Peace", "poster1.jpg", "80x120cm"),
    ("Keep your teeth clean", "poster2.jpg", "50x100cm"),
    ("Swim for health", "poster3.jpg", "70x130cm"),
    ("Keeping up", "poster4.jpg", "60x90cm"),
    ("Washington DC", "poster5.jpg", "50x70cm"),
    ("Let them grow", "poster6.jpg", "50x70cm"),
    ("Scheveningen", "poster7.jpg", "60x90cm"),
    ("Montreal 1924", "poster8.jpg", "70x130cm"),
    ("BTLM", "poster9.jpg", "60x90"),
    ("Like Picasso", "poster10.jpg", "60x90cm")
;
