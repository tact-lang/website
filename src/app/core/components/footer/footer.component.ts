import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LINKS } from '@core/constants/LINKS';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  public LINKS = LINKS;
}
