export interface TactCompiler {
  parse: (tactCode: string) => string;
}
