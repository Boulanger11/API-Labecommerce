/* console.table("hi leo") */

//Importar as entidades e conferir com o "Table ou Log"
/* import { users, products } from "./database";

console.table("USUARIO")
console.table(users)
console.table("PRODUTOS")
console.table(products) */

// EXERCICIO TYPESCRYPT-II
/* import {createUser, getAllUsers, createProduct, getAllProducts, searchProductsByName} from './database'

const createUserResult = createUser ('u003','Astrodev', 'astrodev@email.com','astrodev99')
console.table(createUserResult)

const allUsers = getAllUsers()
console.table(allUsers)

const createProductResult = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://images.unsplash.com/photo")
console.table(createProductResult)

const allProducts = getAllProducts()
console.table(allProducts) 


const searchTerm = "monitor"
 
console.log(searchProductsByName("monitor")) */

//importando o express 👇🏽
import express, { Request, Response } from 'express';
import cors from 'cors';
import { TProducts, TUsers } from './types';
/* import { products, users } from './database'; */
import { db } from './database/knex';


//invocando a função express() dentro da variável app 👇🏽
const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/teste", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "teste!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// USUARIO
app.get("/users", async (req: Request, res: Response) => {
    try {
        /* const result = await db.raw(`SELECT * FROM users`) */
        const result = await db('users')

        res.status(200).send(result)
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro Inesperado")
        }
    }

})

/* app.get("/user", (req: Request, res: Response) => {
    try {
        const q: string = req.query.q as string

        const userByName: TUsers[] = users.filter((user) => user.name.toLocaleLowerCase() === q.toLocaleLowerCase())

        res.status(200).send(userByName)
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

}) */

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password, created_at } = req.body

        if (!id || !name || !email || !password || !created_at) {
            res.status(400)
            throw new Error("algo invalido!")
        }

        const newUsers = {
            id,
            name,
            email,
            password,
            created_at
        }

        await db('users').insert(newUsers)

        res.status(201).send('Usuário Cadastrada')

    }catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro Inesperado")
        }
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error('Por favor, informar o ID a ser deletado.')
        }
        const [users] = await db('users').where({ id: id })

        if (users) {
            await db.delete().from('users').where({ id: id })
        } else {
            res.status(404)
            throw new Error('ID não encontrado!')
        }

        res.status(200).send({ message: "User apagado com sucesso" })
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/users/:id", async (req: Request, res: Response) => {
    const idToEdit = req.params.id

    const newId = req.body.id
    const newName = req.body.name 
    const newEmail = req.body.email 
    const newPassword = req.body.password

    if (newId !== undefined) {

        if (typeof newId !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }
    }
    if (newName !== undefined) {

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }
    }
    if (newEmail !== undefined) {

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }
    }
    if (newPassword !== undefined) {

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'senha' deve ser string")
        }
    }

    const [users] = await db('users').where({id: idToEdit})

    if (users) {
        const updateUsers = {
            id: newId || users.id,
            name: newName || users.name,
            email: newEmail || users.email,
            password: newPassword || users.password
        }

        await db.update(updateUsers).from('users').where({id: idToEdit})
    }


    res.status(200).send({ message: "Produto atualizado com sucesso" })
})





// PRODUTO
app.get("/products", async (req: Request, res: Response) => {
    try {
        /* const name = req.query.name;
        let query = `SELECT * FROM products`;

        if (name) {
            query += ` WHERE name LIKE '%${name}%'`
        } */

        const result = await db('products')

        res.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

})

/* app.get("/product", (req: Request, res: Response) => {
    try {
        const q: string = req.query.q as string

        const productByName: TProducts[] = products.filter((product) => product.name.toLocaleLowerCase() === q.toLocaleLowerCase())

        res.status(200).send(productByName)
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

}) */

app.post("/products", async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (!id || !name || !price || !description || !image_url) {
            res.status(400)
            throw new Error("algo invalido!")
        }

        /* await db.raw(`INSERT INTO products
        VALUES
        ('${id}', '${name}', '${price}', '${description}', '${image_url}')`) */

        const newProducts = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db('products').insert(newProducts)

        res.status(200).send('Produto Cadastrado')

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro Inesperado")
        }
    }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!id) {
            throw new Error('Por favor, informar o ID a ser deletado.')
        }
        const [products] = await db('products').where({ id: id })

        if (products) {
            await db.delete().from('products').where({ id: id })
        } else {
            res.status(404)
            throw new Error('ID não encontrado!')
        }

        res.status(200).send({ message: "Produto apagado com sucesso" })
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage_url = req.body.image_url

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("Id deve ser uma string")
            }

        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("Name deve ser uma string")
            }
            if (newName.length < 2) {
                throw new Error("O name deve ter no mínimo 2 caracteres")
            }
        }

        const [products] = await db('products').where({id: idToEdit})


        if (products) {//undefined 
            /* await db.raw(`
                UPDATE products SET 
                id = '${newId || products.id}', name = '${newName || products.name}', price = '${newPrice || products.price}', description = '${newDescription || products.description}', image_url = '${newImage_url || products.image_url}'
                WHERE id = '${id}'
            `) */
            const updateProducts = {
                id: newId || products.id,
                name: newName || products.name,
                price: newPrice || products.price,
                description: newDescription || products.description,
                image_url: newImage_url || products.image_url
            }

            await db.update(updateProducts).from('products').where({id: idToEdit})

        } else {
            res.status(400)
            throw new Error("Id não encontrado")
        }

        res.status(200).send({ message: "Produto atualizado com sucesso" })

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro Inesperado")
        }
    }
})

//PURCHASES
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        /* const name = req.query.name;
        let query = `SELECT * FROM purchases`;

        if (name) {
            query += ` WHERE name LIKE '%${name}%'`
        }

        const result = await db.raw(query); */

        const result = await db('purchases')

        res.status(200).send(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

})


app.post("/purchases", async (req, res) => {
    try {
        const { id, buyer, total_price, created_at, products } = req.body;

        if (!id || !buyer || !total_price || !created_at || !products) {
            res.status(400).send("Dados inválidos!");
            return;
        }

        // Insira a compra na tabela "purchases".
        /* const purchaseInsertQuery = `
            INSERT INTO purchases (id, buyer, total_price, created_at)
            VALUES (?, ?, ?, ?)
        `; */

        await db('purchases').insert({
            id,
            buyer,
            total_price,
            created_at
        })

/*         await db.raw(purchaseInsertQuery, [id, buyer, total_price, created_at]);
 */
        // Insira os produtos na tabela "purchases_products".
        /* for (const product of products) {
            const { product_id, quantity } = product;
            const purchaseProductInsertQuery = `
                INSERT INTO purchases_products (purchase_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;

            await db.raw(purchaseProductInsertQuery, [id, product_id, quantity]);
        } */

        for (const product of products) {
            const { id: product_id, quantity } = product;
            await db('purchases_products').insert({
              purchase_id: id,
              product_id,
              quantity,
            });
          }

        res.status(201).send('Compra cadastrada com sucesso.');

    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'Erro inesperado');
    }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const purchases = await db.raw(`SELECT * FROM purchases WHERE id = '${id}'`);

        if (purchases && purchases.length > 0) {
            await db.raw(`DELETE FROM purchases WHERE id = '${id}'`);
            res.status(200).json({ message: "Produto excluído com sucesso" });
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir o produto" });
    }

})

