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
import { products, users } from './database';


//invocando a função express() dentro da variável app 👇🏽
const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/teste", (req: Request, res: Response) => {
    res.status(200).send("TESTE, FUNCIONANDO!")
})


// USUARIO
app.get("/users", (req: Request, res: Response) => {
    try {
        const result: TUsers[] = users

        res.status(200).send(result)
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

})

app.get("/user", (req: Request, res: Response) => {
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

})

app.post("/users", (req: Request, res: Response) => {
    try {
        const { id, name, email, password }: TUsers = req.body

        const existingUsersId = users.find((user => user.id === id))
        if (existingUsersId) {
            res.status(400).send("Já existe uma conta com esse ID.")
        }

        const existingUsersEmail = users.find((user => user.email === email))
        if (existingUsersEmail) {
            res.status(400).send("Já existe uma conta com esse Email.")
        }

        const newUser: TUsers = {
            id,
            name,
            email,
            password
        }
        users.push(newUser)

        res.status(201).send("Cadastro realizado com sucesso")
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToDelete = users.findIndex((user => user.id === id))

        if (indexToDelete >= 0) {
            users.splice(indexToDelete, 1)
        } else {
            res.status(404).send({ message: "Produto não encontrado" })
        }

        res.status(200).send({ message: "User apagado com sucesso" })
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.put("/users/:id", (req: Request, res: Response) => {
    const idToEdit = req.params.id

    /* const newId = req.body.id as string | undefined */
    const newName = req.body.name as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === idToEdit)

    if (user) {
        user.name = newName || user.name
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send({ message: "Produto atualizado com sucesso" })
})





// PRODUTO
app.get("/products", (req: Request, res: Response) => {
    try {
        const result: TProducts[] = products

        res.status(200).send(result)
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

})

app.get("/product", (req: Request, res: Response) => {
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

})

app.post("/products", (req: Request, res: Response) => {
    try {
        const { id, name, price, description, imageUrl }: TProducts = req.body

        const existingUsersId = products.find((product => product.id === id))
        if (existingUsersId) {
            res.status(400).send("Já existe uma conta com esse ID.")
        }

        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl
        }
        products.push(newProduct)

        res.status(201).send("Produto cadastrado com sucesso")
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToDelete = products.findIndex((product => product.id === id))

        if (indexToDelete >= 0) {
            users.splice(indexToDelete, 1)
        } else {
            res.status(404).send({ message: "Produto não encontrado" })
        }

        res.status(200).send({ message: "Produto apagado com sucesso" })
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }

})

app.put("/products/:id", (req: Request, res: Response) => {
    const idToEdit = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => product.id === idToEdit)
    if(!product){
        res.status(404).send({message: "Produto não encontrado."})
    }

    if (product) {
        product.id = newId  || product.id
        product.name = newName || product.name
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
        product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
    }

    res.status(200).send({ message: "Produto atualizado com sucesso" })
})