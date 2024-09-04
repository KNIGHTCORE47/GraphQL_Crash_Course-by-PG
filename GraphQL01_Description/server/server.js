import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import bodyPerser from 'body-parser'
import cors from 'cors'
import axios from 'axios'


async function startServer() {
    const app = express()
    const PORT = process.env.PORT || 8000
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                webste: String!
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
                userId: ID!
                userInfo: User
            }

            type Query {
                getAllTodos: [Todo]
                getAllUsers: [User]
                getUserByID(id: ID!): User
            }
        `,
        resolvers: {
            Todo: {
                userInfo: async (todo) => {
                    try {
                        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                        return response.data
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            Query: {
                getAllTodos: async () => {
                    try {
                        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
                        return response.data
                    } catch (error) {
                        console.error(error);
                    }
                },
                getAllUsers: async () => {
                    try {
                        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
                        return response.data
                    } catch (error) {
                        console.error(error);
                    }
                },
                getUserByID: async (parent, { id }) => {
                    try {
                        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                        return response.data
                    } catch (error) {
                        console.error(error);
                    }
                },

            }
        }
    })

    app.use(bodyPerser.json())
    app.use(cors())

    await server.start()

    app.use("/graphql", expressMiddleware(server))

    app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
}

startServer()