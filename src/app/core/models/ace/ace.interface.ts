import { Editor } from '@core/models/ace/editor.interface';
import { ModeConstructor } from '@core/models/ace/mode';

export interface Ace {
  edit(nodeId: string): Editor;
  require(path: string): {
    Mode: ModeConstructor;
  };
}
