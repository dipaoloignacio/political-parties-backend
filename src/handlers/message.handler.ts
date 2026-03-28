import { messageSquema, type MessageParsed } from "../schemas/websocket-message.schema";
import { partiesServices } from "../services/party.service";
import type { WebSocketMessage, WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
    return {
        type: 'ERROR',
        payload: { error: error }
    }
}

//handlers especificos
const handleAddParty = (payload: MessageParsed['payload']): WebSocketResponse => {
    if (!payload?.name || !payload?.color || !payload?.borderColor) {
        return createErrorResponse('debe agregar nombre , color y borde del color.')
    }

    const newParty = partiesServices.add(
        payload.name,
        payload.color,
        payload.borderColor
    )
    return {
        type: 'PARTY_ADDED',
        payload: newParty
    }
}

const handleGetParties = (): WebSocketResponse => {
    return {
        type: 'PARTIES_LIST',
        payload: partiesServices.getAll()
    }
}

const handleUpdateParty = (payload: MessageParsed['payload']): WebSocketResponse => {
    if (!payload?.id) return createErrorResponse('selecione un party ID')

    const updatedParty = partiesServices.update(payload.id, {
        name: payload.name,
        color: payload.color,
        borderColor: payload.borderColor,
        votes: payload.votes,
    })

    if (!updatedParty) {
        return createErrorResponse("party no encontrado")
    }

    return {
        type: 'PARTY_UPDATE',
        payload: updatedParty
    }
}

const handleDeleteParty = (payload: MessageParsed['payload']): WebSocketResponse => {

    if (!payload?.id) return createErrorResponse('selecione un party ID')

    const deleted = partiesServices.delete(payload.id);

    if (!deleted) {
        return createErrorResponse('selecione un party ID')
    }

    return {
        type: 'PARTY_DELETE',
        payload: {
            id: payload.id
        }
    }
}
const handleIncrementVote = (payload: MessageParsed['payload']): WebSocketResponse => {

    if (!payload?.id) return createErrorResponse('selecione un party ID')

    const incrementVote = partiesServices.incrementVote(payload.id)

    if (!incrementVote) {
        return createErrorResponse('no existe party con ese ID')
    }
    return {
        type: 'VOTES_UPDATED',
        payload: incrementVote
    }
}

const handleDecrementVote = (payload: MessageParsed['payload']): WebSocketResponse => {
    if (!payload?.id) return createErrorResponse('selecione un party ID')

    const decrementVote = partiesServices.decrementVote(payload.id)

    if (!decrementVote) {
        return createErrorResponse('no existe party con ese ID')
    }

    return {
        type: 'VOTES_UPDATED',
        payload: decrementVote
    }
}



export const handleMessage = (message: string): WebSocketResponse => {

    try {

        const jsonData: WebSocketMessage = JSON.parse(message)

        const parsedResult = messageSquema.safeParse(jsonData)

        if (!parsedResult.success) {
            const errorMessage = parsedResult.error.issues.map(issue => issue.message).join(', ')

            return createErrorResponse(errorMessage);
        }

        console.log({ payload: jsonData });
        //todo validar objeto json

        const { type, payload } = parsedResult.data

        switch (type) {
            case 'ADD_PARTY':
                return handleAddParty(payload)
            case 'DELETE_PARTY':
                return handleDeleteParty(payload)
            case 'GET_PARTIES':
                return handleGetParties()
            case 'DECREMENT_VOTES':
                return handleDecrementVote(payload)
            case 'INCREMENT_VOTES':
                return handleIncrementVote(payload)
            case 'UPDATE_PARTY':
                return handleUpdateParty(payload)
            default:
                return createErrorResponse('error en handlemessage')
        }

    } catch (error) {

        return createErrorResponse("no se q onda cabron")

    }

}