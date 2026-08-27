import { Component, inject, input } from "@angular/core";
import { GameWsService } from "~api/game/game-ws.service";
import { GameRoomChat } from "~features/game-room-chat/game-room-chat";

@Component({
  selector: 'game-room-page',
  templateUrl: './game-room-page.html',
  styleUrl: './game-room-page.scss',
  standalone: true,
  imports: [GameRoomChat],
})
export class GameRoomPage {
  protected gameService = inject(GameWsService)


}
