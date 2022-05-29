import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { AdaptiveContent } from '@shared/models/adaptive-content.interface';
import { LANGUAGE } from '@shared/models/LANGUAGE';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippetComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  resize(event: Event): void {
    this.onResize((event.target as Window).innerWidth);
  }

  @HostBinding('style.height') get snippetHeight(): string {
    return `${this.linesNumber * this.editorLineHeight + 40}px`;
  }

  @Input()
  language: LANGUAGE = LANGUAGE.TACT;

  @Input() set content(value: string) {
    this._originalContent = value;
    this._contentToDisplay = value;
  }

  @Input() adaptiveContent: AdaptiveContent[] = [];

  private editorLineHeight = 22;

  private _originalContent = '';

  public _contentToDisplay = '';

  private get linesNumber(): number {
    return this._contentToDisplay.split('\n').length;
  }

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  ngOnInit() {
    this.onResize(this.window.innerWidth);
  }

  private onResize(windowWidth: number): void {
    if (!this.adaptiveContent.length) {
      return;
    }

    const breakpoints = this.adaptiveContent.filter(item => item.maxWidth >= windowWidth);
    if (!breakpoints.length) {
      this._contentToDisplay = this._originalContent;
      return;
    }

    this._contentToDisplay = breakpoints.sort((a, b) => a.maxWidth - b.maxWidth)[0].content;
  }
}
