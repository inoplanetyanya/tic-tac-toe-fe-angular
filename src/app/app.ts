import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInput } from './shared/ui/app-input/app-input';
import { AppButton } from './shared/ui/app-button/app-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppInput, AppButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular');

  protected onButtonClick(): void {
    console.log('asdf')
  }
}
