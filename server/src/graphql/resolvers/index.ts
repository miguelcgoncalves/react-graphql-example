import { postQueries, postMutations } from './post'

export const Query = { ...postQueries }
export const Mutation = { ...postMutations }
