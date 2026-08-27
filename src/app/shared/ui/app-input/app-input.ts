import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './app-input.html',
  styleUrl: './app-input.scss',
})
export class AppInput {
  value = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  error = input<string>('');
  hideErrors = input<boolean>(false);

  valueChange = output<string>();

  onInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.valueChange.emit(target.value);
    }
  }
}
