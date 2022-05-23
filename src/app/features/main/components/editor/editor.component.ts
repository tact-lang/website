import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { LANGUAGE } from '@features/main/models/LANGUAGE';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {
  @Input() language: LANGUAGE = LANGUAGE.TACT;

  @Input() value: string = '';

  @Output() valueChanges = new EventEmitter<string>();

  @ViewChild('editor') editor: ElementRef<HTMLElement> | undefined;

  private mutationObserver: MutationObserver | undefined;

  public get editorId(): string {
    return `editor-${this.language}`;
  }

  constructor(@Inject(WINDOW) private window: Window) {}

  ngAfterViewInit() {
    const editor = this.window.ace.edit(this.editorId);
    const TactMode = this.window.ace.require('ace/mode/custom').Mode;
    editor.session.setMode(new TactMode());
    // @ts-ignore
    editor.setOptions({
      fontSize: '16px',
      lineHeight: '26px'
    });
  }
}
