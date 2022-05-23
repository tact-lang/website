export interface EditorMode {}

export type ModeConstructor = {
  new (): EditorMode;
};
