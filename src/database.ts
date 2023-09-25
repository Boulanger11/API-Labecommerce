import { TUsers, TProducts } from "./types";

export const users: TUsers[] = [
    {
        id: 'u001',
        name: 'Fulano',
        email: 'fulano@email.com',
        password: 'fulano123',
        createdAt: new Date().toISOString()
    },
    {
        id: 'u002',
        name: 'Ciclano',
        email: 'ciclano@email.com',
        password: 'ciclano456',
        createdAt: new Date().toISOString()
    }
]

export const products: TProducts[] = [
    {
      id: 'prod001',
      name: 'Mouse gamer',
      price: 250,
      description: 'Melhor mouse do mercado!',
      imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400'
    },
    {
      id: 'prod002',
      name: 'Monitor',
      price: 900,
      description: 'Monitor LED Full HD 24 polegadas',
      imageUrl: 'https://picsum.photos/seed/Monitor/400'
    }
]

export function createUser (id: string, name: string, email: string, password: string) {
    const createdAt = new Date().toISOString()
    const newUser: TUsers = {id, name, email, password, createdAt}
    users.push(newUser)
    console.log("Cadastro realizado com sucesso!");
    
}

export function getAllUsers(): TUsers[] {
    return users
}


export function createProduct (id: string, name: string, price: number, description: string, imageUrl: string) {
    const newProduct: TProducts = {id, name, price, description, imageUrl}
    products.push(newProduct)
    
    console.log("Produto criado com sucesso");
    
}

export function getAllProducts(): TProducts[] {
    return products
}

export function searchProductsByName(name: string): TProducts[]{
    const searchTerm = name.toLocaleLowerCase()
    return products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm))
}