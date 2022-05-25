import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Self } from '@angular/core';
import codeExamples from '@assets/code-examples.json';
import { CodeExample } from '@features/main/models/code-example.interface';
import { EditorService } from '@features/main/services/editor.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-code-examples-select',
  templateUrl: './code-examples-select.component.html',
  styleUrls: ['./code-examples-select.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeExamplesSelectComponent {
  private _selectedIndex: number | null = null;

  public readonly codeExamples: CodeExample[] = codeExamples;

  public get selectedIndex(): number | null {
    return this._selectedIndex;
  }

  private set selectedIndex(value: number | null) {
    this._selectedIndex = value;
  }

  constructor(
    private readonly editorService: EditorService,
    @Self() destroy$: TuiDestroyService,
    cdr: ChangeDetectorRef
  ) {
    this.editorService.tactCode$.pipe(takeUntil(destroy$)).subscribe(tactCode => {
      const sameExampleIndex = this.codeExamples.findIndex(example => example.code === tactCode);

      if (sameExampleIndex === -1) {
        this._selectedIndex = null;
      } else {
        this._selectedIndex = sameExampleIndex;
      }
      cdr.markForCheck();
    });
  }

  public onSelect(index: number): void {
    this.selectedIndex = index;
    this.editorService.tactCode = this.codeExamples[index].code;
  }
}
