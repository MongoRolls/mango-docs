import { query } from './_generated/server'

export const getDocuments = query({
  handler: async (ctx) => {
    const documents = await ctx.db.query('documents').collect()
    // do something with `tasks`
    return documents
  },
})
