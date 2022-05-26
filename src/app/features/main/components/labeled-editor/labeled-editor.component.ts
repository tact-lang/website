import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LANGUAGE } from '@shared/models/LANGUAGE';

@Component({
  selector: 'app-labeled-editor',
  templateUrl: './labeled-editor.component.html',
  styleUrls: ['./labeled-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabeledEditorComponent {
  @Input() language: LANGUAGE = LANGUAGE.TACT;

  @Input() disabled: boolean = false;

  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  public LANGUAGE = LANGUAGE;
}
