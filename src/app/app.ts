import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInput } from './shared/ui/app-input/app-input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppInput],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular');
}
