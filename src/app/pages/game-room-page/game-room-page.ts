import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { GameWsService } from '~api/game/game-ws.service';
import { GameRoomChat } from '~features/game-room-chat/game-room-chat';
import { AppPaths } from '../../app.routes';

@Component({
  selector: 'game-room-page',
  templateUrl: './game-room-page.html',
  styleUrl: './game-room-page.scss',
  standalone: true,
  imports: [GameRoomChat],
})
export class GameRoomPage {
  protected gameService = inject(GameWsService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.gameService.isConnected()) {
        this.router.navigate([AppPaths.GAMES_LIST]);
      }
    });
  }
}
