import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LINKS } from '@core/constants/LINKS';

@Component({
  selector: 'app-what-is-tact',
  templateUrl: './what-is-tact.component.html',
  styleUrls: ['./what-is-tact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatIsTactComponent {
  public LINKS = LINKS;
  public iLink = 'tuiIconLink';
  public max = 100;
  public value = 33;
}
