import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { ProductResolver } from './resolvers/ProductResolver'

export async function startServer() {
    try {
        const app = express()

        app.set('port', process.env.PORT || 3000)

        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [ProductResolver],
                validate: false
        }),
        context: ({req, res}) => ({req, res})
        })

        server.applyMiddleware({app, path: '/graphql'})
        return app

    } catch (e) {
        console.log(e)
    }
}