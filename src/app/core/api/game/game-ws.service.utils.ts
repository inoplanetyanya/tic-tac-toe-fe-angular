import { WsMessage, WsMessageType } from "./game-ws.service.types";

const SERVER = 'server';
const GAME_START_MESSAGE = 'game start'
const GAME_END_MESSAGE = 'game end'


function isMessageFromServer(wsMessage: WsMessage) {
  return wsMessage.from === SERVER
}

export function isGameStartMessage(wsMessage: WsMessage) {
  return isMessageFromServer(wsMessage)
    && wsMessage.message === GAME_START_MESSAGE;
}

export function isGameEndMessage(wsMessage: WsMessage) {
  return isMessageFromServer(wsMessage)
    && wsMessage.message === GAME_END_MESSAGE;
}

export function isChatMessage(wsMessage: WsMessage) {
  return wsMessage.type === WsMessageType.CHAT
}
