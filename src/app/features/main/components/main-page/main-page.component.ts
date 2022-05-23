import { Component, Inject, OnInit } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit() {
    const editor = this.window.ace.edit('editor');
    const TactMode = this.window.ace.require('ace/mode/custom').Mode;
    editor.session.setMode(new TactMode());
  }
}
