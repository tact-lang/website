import { EditorMode } from '@core/models/ace/mode';

export interface Editor {
  session: {
    setMode: (mode: EditorMode) => void;
  };
}
