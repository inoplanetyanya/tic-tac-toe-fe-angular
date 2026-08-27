import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WEB_SOCKET_URL } from '~api/base-url';

@Injectable({
  providedIn: 'root',
})
export class GameWsService {
  private readonly authService = inject(AuthService);

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

  private handleServerMessage(message: string): void {
    console.log('[WS Получено]:', message);
  }

  public disconnect(): void {
    if (this.socket) {
      this.sendMessage('/disconnect');
      this.socket.close();
    }
  }
}
