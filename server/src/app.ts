import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import graphqlSchema from '@/graphql/schema'
import { type GraphQLFormattedError } from 'graphql'

const app = express()

app.use(express.json())
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,

    customFormatErrorFn(e): GraphQLFormattedError {
      console.error(e)
      return { message: e.message }
    },
    graphiql: true,
  }),
)

export default app
