import { EditorMode } from '@core/models/ace/mode';

export interface Editor {
  session: {
    getValue: () => string;
    setValue: (val: string) => void;
    setMode: (mode: EditorMode) => void;
    on: (event: 'change', callback: () => void) => void;
  };
  setOptions: (options: Object) => void;
  setReadOnly: (readonly: boolean) => void;
  renderer: {
    setScrollMargin: (top: number, bottom?: number, left?: number, right?: number) => void;
  };
}
