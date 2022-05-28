import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { CompilationResult } from '@features/main/models/compilation-result.interface';
import { LANGUAGE } from '@shared/models/LANGUAGE';
import { EditorService } from '@features/main/services/editor.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorsComponent {
  private readonly DEBOUNCE_TIMEOUT_MS = 750;

  private readonly tactCodeInputSubject$ = new Subject<string>();

  public readonly LANGUAGE = LANGUAGE;

  public readonly tactCode$: Observable<string>;

  public readonly funcCompilationResult$: Observable<CompilationResult>;

  constructor(private readonly editorService: EditorService, @Self() destroy$: TuiDestroyService) {
    this.tactCode$ = editorService.tactCode$;
    this.funcCompilationResult$ = editorService.funcCompilationResult$;

    this.tactCodeInputSubject$
      .pipe(debounceTime(this.DEBOUNCE_TIMEOUT_MS), takeUntil(destroy$))
      .subscribe(value => (this.editorService.tactCode = value));
  }

  public onTactCodeChange(value: string): void {
    this.tactCodeInputSubject$.next(value);
  }
}
