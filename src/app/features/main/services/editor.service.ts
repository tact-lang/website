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
      ';; testable\n' +
        '() recv_internal(slice in_msg_body) impure {\n' +
        '  throw_if(34, in_msg_body.slice_bits() < 32);\n' +
        '  int n = in_msg_body~load_uint(32);\n' +
        '\n' +
        '  slice ds = get_data().begin_parse();\n' +
        '  int total = ds~load_uint(64);\n' +
        '\n' +
        '  set_data(begin_cell().store_uint(total + n, 64).end_cell());\n' +
        '}\n' +
        '\n' +
        ';; testable\n' +
        'int get_total() method_id {\n' +
        '  slice ds = get_data().begin_parse();\n' +
        '  int total = ds~load_uint(64);\n' +
        '  return total;\n' +
        '}\n'
    );
  }
}
