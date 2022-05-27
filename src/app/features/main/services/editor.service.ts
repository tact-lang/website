import { Inject, Injectable } from '@angular/core';
import { TactCompiler } from '@core/models/tact/tact-compiler.interface';
import { WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject } from 'rxjs';

const tactCodeExample =
  'struct Foo {\n  val a: Int(32)\n  val b: Int(16)\n}\nlet serialize_foo = serializer(Foo);\n\nfn test() -> Builder {\n  let b = Builder.new();\n  return serialize_foo(Foo{a: Int(32).new(0), b: Int(16).new(1)}, b);\n}';

@Injectable()
export class EditorService {
  private readonly compiler: TactCompiler;

  private readonly _tactCode$ = new BehaviorSubject<string>('');

  private readonly _funcCode$ = new BehaviorSubject<string>('');

  public readonly tactCode$ = this._tactCode$.asObservable();

  public readonly funcCode$ = this._funcCode$.asObservable();

  public get tactCode(): string {
    return this._tactCode$.getValue();
  }

  public get funcCode(): string {
    return this._funcCode$.getValue();
  }

  public set tactCode(value: string) {
    this._tactCode$.next(value);
    this.compile();
  }

  private set funcCode(value: string) {
    this._funcCode$.next(value);
  }

  constructor(@Inject(WINDOW) window: Window) {
    this.compiler = window.Tact;
    this.tactCode = tactCodeExample;
  }

  private compile(): void {
    try {
      this.funcCode = this.compiler.parse(this.tactCode);
    } catch (e: unknown) {
      this.funcCode = (e as Error).toString();
    }
  }
}
