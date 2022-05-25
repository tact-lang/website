import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-page-title',
  templateUrl: './main-page-title.component.html',
  styleUrls: ['./main-page-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageTitleComponent {}
