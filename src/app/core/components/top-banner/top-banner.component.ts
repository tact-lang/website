import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LINKS } from '@core/constants/LINKS';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBannerComponent {
  public LINKS = LINKS;
}
