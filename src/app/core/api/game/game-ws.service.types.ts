export const enum WsMessageType {
  CHAT = 'chat'
}

export interface WsMessage {
  from: string;
  message: string;
  type: WsMessageType;
}

export interface ChatMessage {
  from: string;
  message: string;
}
