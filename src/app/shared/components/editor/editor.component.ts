import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { Editor } from '@core/models/ace/editor.interface';
import { LANGUAGE } from '@features/main/models/LANGUAGE';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements AfterViewInit {
  @Input() language: LANGUAGE = LANGUAGE.TACT;

  @Input() disabled: boolean = false;

  @Input() set value(val: string | null) {
    val ||= '';
    if (this._value === val) {
      return;
    }

    this._value = val;
    if (this.editor) {
      this.editor.session.setValue(this._value);
    }
  }

  @Output() valueChange = new EventEmitter<string>();

  public get editorId(): string {
    return this._editorId;
  }

  private _value: string = '';

  private readonly _editorId = this.generateEditorId();

  private editor: Editor | undefined;

  constructor(@Inject(WINDOW) private window: Window) {}

  ngAfterViewInit() {
    this.editor = this.window.ace.edit(this.editorId);
    const TactMode = this.window.ace.require('ace/mode/custom').Mode;
    this.editor.session.setMode(new TactMode());
    this.editor.setOptions({
      fontSize: '16px'
    });

    this.editor.session.setValue(this._value);
    this.editor.setReadOnly(this.disabled);

    this.editor.session.on('change', () => {
      const editorText = this.editor!.session.getValue();
      this._value = editorText;
      this.valueChange.emit(editorText);
    });
  }

  private generateEditorId(): string {
    return `editor${Math.round(Math.random() * 100000)}`;
  }
}
