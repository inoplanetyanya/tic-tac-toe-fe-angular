import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import { GameWsService } from '~api/game/game-ws.service';
import { ChatMessage } from '~features/game-room-chat/chat-message/chat-message';
import { AppInput } from '~shared/ui/app-input/app-input';
import { AppButton } from '~shared/ui/app-button/app-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-room-chat',
  templateUrl: './game-room-chat.html',
  styleUrl: './game-room-chat.scss',
  standalone: true,
  imports: [ChatMessage, AppInput, AppButton, CommonModule, ReactiveFormsModule],
})
export class GameRoomChat {
  public gameService = input<GameWsService>();

  constructor() {
    effect(() => {
      const gs = this.gameService();
      if (!gs) return;

      const history = gs.chatHistory();
      setTimeout(() => this.scrollChat(), 0);
    });
  }

  private chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer')
  private scrollChat(): void {
    const container = this.chatContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  protected readonly form = new FormGroup({
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected onChangeMessage(value: string) {
    const control = this.form.get('message');

    if (!control) {
      return;
    }

    control.setValue(value);
    control.markAsTouched();
  }

  protected get isDisabledButton() {
    return this.form.invalid;
  }

  protected onFormSubmit(): void {
    if (this.form.valid) {
      const control = this.form.get('message');
      console.log('control: ', control);

      if (!control) {
        return;
      }

      const gs = this.gameService();
      console.log('gs: ', gs);

      if (!gs) {
        return;
      }

      gs.sendMessageToChat(control.value);
      control.setValue('');
    } else {
      this.form.markAllAsTouched();
    }
  }
}
