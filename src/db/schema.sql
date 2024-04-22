
-- Creas la tabla users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);

-- Creas la tabla restaurants
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Creas la tabla reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    restaurantId INTEGER NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
);

-- Anadir restaurantes a la tabla restaurants
INSERT INTO restaurants (name, address, category) VALUES
('Restaurante A', 'Calle 123', 'Italiana'),
('Restaurante B', 'Avenida 456', 'Mexicana'),
('Restaurante C', 'Calle 789', 'China'),
('Restaurante D', 'Avenida 1011', 'Japonesa'),
('Restaurante E', 'Calle 1213', 'Francesa'),
('Restaurante F', 'Avenida 1415', 'Vegetariana');

-- Tabla session:

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");