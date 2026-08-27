import { Component, input, output } from '@angular/core';
import {
  APP_BUTTON_TYPE_DEFAULT,
  APP_BUTTON_VARIANT_DEFAULT,
  AppButtonColorsByVariant,
  AppButtonType,
  AppButtonVariant,
} from './app-button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
})
export class AppButton {
  type = input<AppButtonType>(APP_BUTTON_TYPE_DEFAULT);
  variant = input<AppButtonVariant>(APP_BUTTON_VARIANT_DEFAULT);

  protected get colors() {
    return (
      AppButtonColorsByVariant[this.variant()] ||
      AppButtonColorsByVariant[APP_BUTTON_VARIANT_DEFAULT]
    );
  }

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
