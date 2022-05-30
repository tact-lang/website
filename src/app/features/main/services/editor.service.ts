import { Inject, Injectable } from '@angular/core';
import { TactCompiler } from '@core/models/tact/tact-compiler.interface';
import { CompilationResult } from '@features/main/models/compilation-result.interface';
import { WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject } from 'rxjs';

const tactCodeExample =
  'struct Wallet {\n' +
  '  val seqno: Int(32)\n' +
  '  val pubkey: Int(256)\n' +
  '}\n' +
  '\n' +
  'let serialize_wallet = serializer(Wallet);\n' +
  '\n' +
  'fn test() -> Builder {\n' +
  '  let b = Builder.new();\n' +
  '  return serialize_wallet(Wallet{seqno: 0, pubkey: 777}, b);\n' +
  '}';

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
