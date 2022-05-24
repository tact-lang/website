import { Component } from '@angular/core';
import { LANGUAGE } from '@features/main/models/LANGUAGE';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent {
  public LANGUAGE = LANGUAGE;

  public funcValue = '';
}
