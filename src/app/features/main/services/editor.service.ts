import { Inject, Injectable } from '@angular/core';
import { TactCompiler } from '@core/models/tact/tact-compiler.interface';
import { CompilationResult } from '@features/main/models/compilation-result.interface';
import { WINDOW } from '@ng-web-apis/common';
import { BehaviorSubject } from 'rxjs';

const tactCodeExample =
  'message (0x123123) TransferMsg {\n' +
  '  to: Address;\n' +
  '  text: String;\n' +
  '}\n' +
  '\n' +
  'contract SimpleContract {\n' +
  '  init() {}\n' +
  '  receive() {}\n' +
  '  receive(msg: TransferMsg) {\n' +
  '      send(SendParameters{\n' +
  '          to: msg.to,\n' +
  '          value: 0,\n' +
  '          mode: SendRemainingValue,\n' +
  '          body: msg.text.asComment()\n' +
  '      });\n' +
  '  }\n' +
  '}';

const funCCodeExample =
  'include "imports/stdlib.fc";\n' +
  '\n' +

  'int op::transfer_coins() asm "0x123123 PUSHINT";\n' +
  '() recv_internal(int my_balance, int msg_value, cell in_msg_full, slice in_msg_body) impure {\n' +
  '  if (in_msg_body.slice_empty?()) { ;; ignore empty messages\n' +
  '    return ();\n' +
  '  }\n' +
  '\n' +
  '  slice cs = in_msg_full.begin_parse();\n' +
  '  int flags = cs~load_uint(4);\n' +
  '  if (flags & 1) { ;; ignore all bounced messages\n' +
  '    return ();\n' +
  '  }\n' +
  '\n' +
  '  int op = in_msg_body~load_uint(32);\n' +
  '  if(op == op::transfer_coins()) {\n' +
  '    slice to = in_msg_body~load_msg_addr();\n' +
  '    cell text = in_msg_body~load_ref();\n' +
  '    cell msg = begin_cell()\n' +
  '      .store_uint(0x18, 6)\n' +
  '      .store_slice(to)\n' +
  '      .store_coins(0)\n' +
  '      .store_uint(1, 1 + 4 + 4 + 64 + 32 + 1 + 1)\n' +
  '      .store_ref(begin_cell().store_uint(0, 8)\n' +
  '      .store_slice(text.begin_parse()).end_cell())\n' +
  '      .end_cell();\n' +
  '\n' +
  '    send_raw_message(msg, 64);\n' +
  '    return ();\n' +
  '  }\n' +
  '\n' +
  '  throw(0xffff);\n' +
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
      const code = funCCodeExample; // this.compiler.parse(this.tactCode);

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
