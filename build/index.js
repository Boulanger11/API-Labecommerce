"use strict";
/* console.table("hi leo") */
Object.defineProperty(exports, "__esModule", { value: true });
//Importar as entidades e conferir com o "Table ou Log"
/* import { users, products } from "./database";

console.table("USUARIO")
console.table(users)
console.table("PRODUTOS")
console.table(products) */
const database_1 = require("./database");
const createUserResult = (0, database_1.createUser)('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99');
/* console.table(createUserResult) */
const allUsers = (0, database_1.getAllUsers)();
/* console.table(allUsers) */
const createProductResult = (0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo");
/* console.table(createProductResult) */
const allProducts = (0, database_1.getAllProducts)();
/* console.table(allProducts) */
/* const searchTerm = "monitor" */
console.log((0, database_1.searchProductsByName)("monitor"));
