import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompilationResult } from '@features/main/models/compilation-result.interface';
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

  public funcCompilationResult$: Observable<CompilationResult>;

  constructor(private readonly editorService: EditorService) {
    this.tactCode$ = editorService.tactCode$;
    this.funcCompilationResult$ = editorService.funcCompilationResult$;
  }

  public onTactCodeChange(value: string): void {
    this.editorService.tactCode = value;
  }
}
