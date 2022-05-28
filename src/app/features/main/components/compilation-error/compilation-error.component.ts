import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-compilation-error',
  templateUrl: './compilation-error.component.html',
  styleUrls: ['./compilation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompilationErrorComponent {
  @Input() errorText: string = '';

  public open = false;
}
