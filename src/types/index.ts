export interface PoliticalParty {
    id: string,
    name: string,
    color: string,
    borderColor: string,
    votes: number
}

export interface WebSocketMessage {
    type: MessageType
    payload: unknown // todo : message payload
}

export type MessageType =
    | 'GET_PARTIES'
    | 'ADD_PARTY'
    | 'UPDATE_PARTY'
    | 'DELETE_PARTY'
    | 'INCREMENT_VOTES'
    | 'DECREMENT_VOTES'

export interface WebSocketResponse {
    type:
    'PARTIES_LIST' |
    'PARTY_ADDED' |
    'PARTY_UPDATE' |
    'PARTY_DELETE' |
    'VOTES_UPDATED' |
    'ERROR';
    payload: unknown //todo response Payload
}

export interface WebSocketData {
    clientId: string;
}