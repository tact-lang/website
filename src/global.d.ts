import { TactCompiler } from '@core/models/tact/tact-compiler.interface';
import { Ace } from '@core/models/ace/ace.interface';

declare global {
  interface Window {
    ace: Ace;
    Tact: TactCompiler;
  }
}
