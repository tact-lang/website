import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LINKS } from '@core/constants/LINKS';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public burgerOpened = false;

  public LINKS = LINKS;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  public burgerToggled(): void {
    this.document.documentElement.classList.toggle('burger-opened');
  }
}
