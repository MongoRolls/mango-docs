/* eslint-disable no-console */
import { paginationOptsValidator } from 'convex/server'
import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organizationId ?? undefined) as | string | undefined

    const documentId = await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled',
      initialContent: args.initialContent ?? '',
      ownerId: user.subject,
      organizationId,
    })
    return documentId
  },
})

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    console.log({ user })

    const organizationId = (user.organizationId ?? undefined) as string | undefined

    // 如果搜索条件不为空，并且组织ID不为空，则搜索组织内的文档
    if (args.search && organizationId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q =>
          q.search('title', args.search!).eq('organizationId', organizationId))
        .paginate(args.paginationOpts)
    }

    // 如果搜索条件不为空，则搜索用户自己的文档
    if (args.search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', q =>
          q.search('title', args.search!).eq('ownerId', user.subject))
        .paginate(args.paginationOpts)
    }

    // 如果组织ID不为空，则搜索组织内的文档
    if (organizationId) {
      const documents = await ctx.db
        .query('documents')
        .withIndex('by_organization', q => q.eq('organizationId', organizationId))
        .paginate(args.paginationOpts)
      return documents
    }

    // 如果组织ID为空，则搜索用户自己的文档
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_owner', q => q.eq('ownerId', user.subject))
      .paginate(args.paginationOpts)
    // do something with `tasks`
    return documents
  },
})

export const removeById = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organizationId ?? undefined) as string | undefined
    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    const isOwner = document.ownerId === user.subject

    const isOrganizationMember
      = !!(document.organizationId && document.organizationId === organizationId)

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError('Unauthorized')
    }

    return await ctx.db.delete(args.id)
  },
})

export const updateById = mutation({
  args: { id: v.id('documents'), title: v.string() },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) {
      throw new ConvexError('Unauthorized')
    }

    const organizationId = (user.organizationId ?? undefined) as string | undefined
    const document = await ctx.db.get(args.id)
    if (!document) {
      throw new ConvexError('Document not found')
    }

    const isOwner = document.ownerId === user.subject
    const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId)

    console.log('isOwner', isOwner)
    console.log('isOrganizationMember', isOrganizationMember)
    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError('Unauthorized')
    }

    return await ctx.db.patch(args.id, { title: args.title })
  },
})

export const getById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})
