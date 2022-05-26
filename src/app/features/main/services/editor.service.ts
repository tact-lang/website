import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EditorService {
  private _tactCode$ = new BehaviorSubject<string>('');

  private _funcCode$ = new BehaviorSubject<string>('');

  public tactCode$ = this._tactCode$.asObservable();

  public funcCode$ = this._funcCode$.asObservable();

  public get tactCode(): string {
    return this._tactCode$.getValue();
  }

  public get funcCode(): string {
    return this._funcCode$.getValue();
  }

  public set tactCode(value: string) {
    this._tactCode$.next(value);
  }

  constructor() {
    this._funcCode$.next(
      'builder function_0(int self, builder builder) {\n' +
        '  return store_int(builder, self, 32);\n' +
        '}\n' +
        'builder function_1(int self, builder builder) {\n' +
        '  return store_int(builder, self, 16);\n' +
        '}\n' +
        'builder serialize_foo([int, int] self, builder builder) {\n' +
        '  builder builder = function_0(first(self), builder);\n' +
        '  builder builder = function_1(second(self), builder);\n' +
        '  return builder;\n' +
        '}\n' +
        'builder function_2() {\n' +
        '  return new_builder();\n' +
        '}\n' +
        'builder test() {\n' +
        '  builder b = function_2();\n' +
        '  return serialize_foo([0, 1], b);\n' +
        '}'
    );

    this._tactCode$.next(
      'struct Foo {\n' +
        '  val a: Int(32)\n' +
        '  val b: Int(16)\n' +
        '}\n' +
        'let serialize_foo = serializer(Foo);\n' +
        '\n' +
        'fn test() -> Builder {\n' +
        '  let b = Builder.new();\n' +
        '  return serialize_foo(Foo{a: Int(32).new(0), b: Int(16).new(1)}, b);\n' +
        '}'
    );
  }
}
