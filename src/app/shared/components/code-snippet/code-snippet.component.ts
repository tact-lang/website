import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LANGUAGE } from '@shared/models/LANGUAGE';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippetComponent {
  @Input() language: LANGUAGE = LANGUAGE.TACT;

  @Input() content: string = '';

  constructor() {}
}
