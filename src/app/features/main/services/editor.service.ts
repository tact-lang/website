import { Inject, Injectable } from '@angular/core';
import { TactCompiler } from '@core/models/tact/tact-compiler.interface';
import { CompilationResult } from '@features/main/models/compilation-result.interface';
import { WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject } from 'rxjs';

const tactCodeExample =
  'struct Foo {\n  val a: Int(32)\n  val b: Int(16)\n}\nlet serialize_foo = serializer(Foo);\n\nfn test() -> Builder {\n  let b = Builder.new();\n  return serialize_foo(Foo{a: Int(32).new(0), b: Int(16).new(1)}, b);\n}';

@Injectable()
export class EditorService {
  private readonly compiler: TactCompiler;

  private readonly _tactCode$ = new BehaviorSubject<string>('');

  private readonly _funcCompilationResult$ = new BehaviorSubject<CompilationResult>({ code: '' });

  public readonly tactCode$ = this._tactCode$.asObservable();

  public readonly funcCompilationResult$ = this._funcCompilationResult$.asObservable();

  public get tactCode(): string {
    return this._tactCode$.getValue();
  }

  public get funcCompilationResult(): CompilationResult {
    return this._funcCompilationResult$.getValue();
  }

  public set tactCode(value: string) {
    this._tactCode$.next(value);
    this.compile();
  }

  constructor(@Inject(WINDOW) window: Window) {
    this.compiler = window.Tact;
    this.tactCode = tactCodeExample;
  }

  private setCompilationResult(value: CompilationResult): void {
    this._funcCompilationResult$.next(value);
  }

  private compile(): void {
    try {
      const code = this.compiler.parse(this.tactCode);

      if (code === 'Error') {
        throw new Error('invalid Tact input');
      }

      this.setCompilationResult({ code, error: undefined });
    } catch (e: unknown) {
      this.setCompilationResult({
        code: this.funcCompilationResult.code,
        error: (e as Error).toString()
      });
    }
  }
}
