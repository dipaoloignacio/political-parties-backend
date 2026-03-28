import { z } from 'zod'

const typeSquema = z.enum([
    'GET_PARTIES',
    'ADD_PARTY',
    'UPDATE_PARTY',
    'DELETE_PARTY',
    'INCREMENT_VOTES',
    'DECREMENT_VOTES'
])

const payloadSquema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    color: z.string().optional(),
    borderColor: z.string().optional(),
    votes: z.number().optional(),
})
export const messageSquema = z.object({

    type: typeSquema,
    payload: payloadSquema.optional(),
})

export type MessageParsed = z.infer<typeof messageSquema>
export type MessagePayload = z.infer<typeof payloadSquema>