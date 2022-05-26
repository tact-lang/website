import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LANGUAGE } from '@shared/models/LANGUAGE';
import { EditorService } from '@features/main/services/editor.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorsComponent {
  public LANGUAGE = LANGUAGE;

  public tactCode$: Observable<string>;

  public funcCode$: Observable<string>;

  constructor(private readonly editorService: EditorService) {
    this.tactCode$ = editorService.tactCode$;
    this.funcCode$ = editorService.funcCode$;
  }

  public onTactCodeChange(value: string): void {
    this.editorService.tactCode = value;
  }
}
