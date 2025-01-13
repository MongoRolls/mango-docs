import { auth, currentUser } from '@clerk/nextjs/server'
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
  const { sessionClaims } = await auth()

  if (!sessionClaims)
    return new Response('Unauthorized', { status: 401 })

  // console.log('sessionClaims', sessionClaims)
  const user = await currentUser()

  if (!user)
    return new Response('Unauthorized', { status: 401 })

  const { room } = await req.json()
  const document = await convex.query(api.document.getById, { id: room })

  // console.log('document', document)

  // console.log('xzc sessionClaims.org_Id', sessionClaims.org_Id, 'document.organizationId', document?.organizationId)
  if (!document)
    return new Response('Document not found', { status: 401 })

  // org-id小写字母 ！！！！
  const isOwner = document.ownerId === user.id
  const isOrganizationMember
    = !!(document.organizationId && document.organizationId === sessionClaims.org_id)

  if (!isOwner && !isOrganizationMember) {
    return new Response('Unauthorized', { status: 401 })
  }

  const session = await liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? 'Anonymous',
      avatarUrl: user.imageUrl,
    },
  })

  session.allow(room, session.FULL_ACCESS)

  const { body, status } = await session.authorize()

  return new Response(body, { status })
}
