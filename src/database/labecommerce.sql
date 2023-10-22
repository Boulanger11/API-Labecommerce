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
/* 
INSERT INTO users (id, name, email, password, created_at) VALUES ('000', 'Leonardo', 'leo@email.com', '1234', '10/11/1997');

INSERT INTO users (id, name, email, password, created_at) VALUES ('001', 'Ingrid', 'ingrid@email.com', '4321', '14/05/1957');

INSERT INTO users (id, name, email, password, created_at) VALUES ('002', 'Valquiria', 'val@email.com', '0000', '15/01/1987'); */

DELETE FROM users WHERE id = '002';

--PRODUTOS
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

/* INSERT INTO products (id, name, price, description, image_url) VALUES ('000', 'mouse', 15, 'mouse gamer', 'https://picsum.photos/seed/Mouse%20gamer/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('001', 'monitor', 100, 'monitor', 'https://picsum.photos/seed/Monitor/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('002', 'teclado', 20, 'teclado mecanico', 'https://picsum.photos/seed/Teclado/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('003', 'headset', 40, 'fone gamer', 'https://picsum.photos/seed/Fone/400');

INSERT INTO products (id, name, price, description, image_url) VALUES ('004', 'mousepad', 5, 'mousepad', 'https://picsum.photos/seed/Mousepad/400'); */

DELETE FROM products WHERE id = '004';

CREATE Table purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL ,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES
('pur000', 'u001', 0, '10/11/1997'),
('pur002', 'u002', 1, '14/05/1957');

DROP Table purchases;

UPDATE purchases
set total_price = total_price + 10
WHERE id = 'pur001';

SELECT
    p.id AS id_da_compra,
    p.buyer AS id_de_quem_fez_a_compra,
    u.name AS nome_de_quem_fez_a_compra,
    u.email AS email_de_quem_fez_a_compra,
    p.total_price AS preço_total_da_compra,
    p.created_at AS data_da_compra
FROM purchases AS p
JOIN users AS u ON p.buyer = u.id
WHERE p.id = '001';

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ('000', '000', 5), ('000', '001', 3);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ('001', '001', 2), ('001', '000', 1);

DROP TABLE purchases_products;

SELECT pp.*, p.*, pr.*
FROM purchases_products pp
INNER JOIN purchases p ON pp.purchase_id = p.id
INNER JOIN products pr ON pp.product_id = pr.id;


