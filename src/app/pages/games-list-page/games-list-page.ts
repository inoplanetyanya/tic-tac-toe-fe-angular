import { Component, effect, inject } from '@angular/core';
import { AuthService } from '~api/auth/auth.service';
import { GameWsService } from '~api/game/game-ws.service';
import { GamesList } from '~features/games-list/games-list';
import { AppButton } from '~shared/ui/app-button/app-button';
import { APP_BUTTON_VARIANT } from '~shared/ui/app-button/app-button.types';

@Component({
  selector: 'games-list-page',
  templateUrl: './games-list-page.html',
  styleUrl: './games-list-page.scss',
  standalone: true,
  imports: [GamesList, AppButton],
})
export class GamesListPage {
  private authService = inject(AuthService);
  private gameService = inject(GameWsService);
  protected APP_BUTTON_VARIANT = APP_BUTTON_VARIANT;

  constructor() {
    effect(() => {
      const isChecked = this.authService.isLocalStorageCheckedForToken();
      if (isChecked) {
        this.gameService.connectWs();
      }
    });
  }

  protected connectToRandomGame() {
    this.gameService.connectToRandomGame();
  }

  protected logout() {
    this.authService.logout();
  }
}
