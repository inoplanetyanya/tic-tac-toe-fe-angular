import { Component, input } from '@angular/core';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
  standalone: true,
  imports: [],
})
export class ChatMessage {
  public message = input<string>('');
  public from = input<string>('');
}
