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
import { LANGUAGE_MODE_PATHS } from '@shared/constants/LANGUAGE_MODE_PATHS';
import { LANGUAGE } from '@shared/models/LANGUAGE';
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

  @Input() margin: [number?, number?, number?, number?] = [];

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
    const GrammarMode = this.window.ace.require(LANGUAGE_MODE_PATHS[this.language]).Mode;
    this.editor.session.setMode(new GrammarMode());
    this.editor.setOptions({
      fontSize: '16px',
      fontFamily: 'JetBrains-Mono'
    });

    this.editor.session.setValue(this._value);
    this.editor.setReadOnly(this.disabled);
    this.editor.renderer.setScrollMargin(
      this.margin[0] || 0,
      this.margin[1] || 0,
      this.margin[2] || 0,
      this.margin[3] || 0
    );

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
