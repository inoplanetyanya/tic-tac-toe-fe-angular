import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WEB_SOCKET_URL } from '~api/base-url';
import { ChatMessage, WsMessage } from '~api/game/game-ws.service.types';
import { Router } from '@angular/router';
import { isChatMessage, isGameEndMessage, isGameStartMessage } from '~api/game/game-ws.service.utils';

@Injectable({
  providedIn: 'root',
})
export class GameWsService {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private socket: WebSocket | null = null;
  public readonly isConnected = signal<boolean>(false);

  public connectWs(): void {
    if (this.socket) return;

    this.socket = new WebSocket(WEB_SOCKET_URL);

    this.socket.onopen = () => {
      this.isConnected.set(true);
      const token = this.authService.accessToken();

      if (!token) {
        console.error('there is no token');
        this.router.navigate(['/login']);
        return;
      }

      this.sendMessage(`/auth ${token}`);
    };

    this.socket.onmessage = (event) => {
      this.handleServerMessage(event.data);
    };

    this.socket.onclose = () => {
      this.isConnected.set(false);
      this.socket = null;
    };
  }

  public connectToRandomGame() {
    this.sendMessage('/connect');
  }

  public sendMessage(msg: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(msg);
    }
  }

  public chatHistory = signal<ChatMessage[]>([]);
  public sendMessageToChat(message: string) {
    this.sendMessage(`/chat ${message}`);
  }

  private handleServerMessage(rawData: string): void {
    try {
      const parsed: WsMessage = JSON.parse(rawData);
      console.log('[WS Received]:', parsed);

      if (isGameStartMessage(parsed)) {
        this.router.navigate(['/game']);
      }

      if (isGameEndMessage(parsed)) {
        this.router.navigate(['/games-list']);
      }

      if (isChatMessage(parsed)) {
        this.chatHistory.set(this.chatHistory().concat(parsed))
      }
    } catch (err) {
      console.error('[WS ERROR] Message parsing error:', err);
    }
  }


  public disconnect(): void {
    if (this.socket) {
      this.sendMessage('/disconnect');
      this.socket.close();
    }
  }
}
