import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { LANGUAGE } from '@shared/models/LANGUAGE';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippetComponent {
  @HostBinding('style.height') get snippetHeight(): string {
    return `${this.linesNumber * this.editorLineHeight + 40}px`;
  }

  @Input()
  language: LANGUAGE = LANGUAGE.TACT;

  @Input() content: string = '';

  private get linesNumber(): number {
    return this.content.split('\n').length;
  }

  private editorLineHeight = 22;

  constructor() {}
}
