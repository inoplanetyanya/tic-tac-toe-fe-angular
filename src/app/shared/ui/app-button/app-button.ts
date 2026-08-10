import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
})
export class AppButton {
  type = input<'button' | 'submit' | 'reset'>('button');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);

  click = output<MouseEvent>();

  onButtonClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.stopPropagation();
      return;
    }
    this.click.emit(event);
  }
}
