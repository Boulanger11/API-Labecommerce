-- Active: 1696268429171@@127.0.0.1@3306

--USUÁRIO
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at) VALUES ('000', 'Leonardo', 'leo@email.com', '1234', '10/11/1997');

INSERT INTO users (id, name, email, password, created_at) VALUES ('001', 'Ingrid', 'ingrid@email.com', '4321', '14/05/1957');

INSERT INTO users (id, name, email, password, created_at) VALUES ('002', 'Valquiria', 'val@email.com', '0000', '15/01/1987');

--PRODUTOS
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url) VALUES ('000', 'mouse', 15, 'mouse gamer', 'https://picsum.photos/seed/Mouse%20gamer/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('001', 'monitor', 100, 'monitor', 'https://picsum.photos/seed/Monitor/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('002', 'teclado', 20, 'teclado mecanico', 'https://picsum.photos/seed/Teclado/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('003', 'headset', 40, 'fone gamer', 'https://picsum.photos/seed/Fone/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('004', 'mousepad', 5, 'mousepad', 'https://picsum.photos/seed/Mousepad/400');

DELETE FROM products WHERE id = '000';
