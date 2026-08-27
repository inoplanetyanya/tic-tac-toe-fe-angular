import { Component, input, output, viewChild, ElementRef, effect } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.html',
  styleUrl: './app-modal.scss',
  standalone: true,
  imports: [],
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  closed = output<void>();

  private dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialogElement');

  constructor() {
    effect(() => {
      const show = this.isOpen();
      const dialog = this.dialogRef()?.nativeElement;

      if (dialog) {
        if (show && !dialog.open) {
          dialog.showModal();
        } else if (!show && dialog.open) {
          dialog.close();
        }
      }
    });
  }

  protected onNativeClose() {
    this.closed.emit();
  }
}
