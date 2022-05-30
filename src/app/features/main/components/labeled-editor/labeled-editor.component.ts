import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { LANGUAGE } from '@shared/models/LANGUAGE';

@Component({
  selector: 'app-labeled-editor',
  templateUrl: './labeled-editor.component.html',
  styleUrls: ['./labeled-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabeledEditorComponent implements OnInit {
  @Input() language: LANGUAGE = LANGUAGE.TACT;

  @Input() disabled: boolean = false;

  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  public LANGUAGE = LANGUAGE;

  public marginTop = 24;

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  ngOnInit() {
    const windowWidth = this.window.innerWidth;
    if (windowWidth < 740) {
      this.marginTop = 16;
    }
  }

  public onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
