/* eslint-disable import/extensions,angular-functions/explicit-function-return-type */

const funcKeywords = [
  '#pragma',
  'version',
  'not-version',
  'test-version-set',
  '#include',
  'return',
  'var',
  'repeat',
  'do',
  'while',
  'until',
  'if',
  'ifnot',
  'then',
  'else',
  'elseif',
  'elseifnot',
  'int',
  'cell',
  'slice',
  'builder',
  'cont',
  'tuple',
  'type',
  'true',
  'false',
  'forall',
  'extern',
  'global',
  'asm',
  'impure',
  'inline',
  'inline_ref',
  'auto_apply',
  'method_id',
  'operator',
  'infixl',
  'infixr',
  'const'
];

ace.define(
  'ace/mode/func',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/func_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextMode = aceRequire('ace/mode/text').Mode;
    const FuncHighlightRules = aceRequire('ace/mode/func_highlight_rules').FuncHighlightRules;

    const Mode = function () {
      this.HighlightRules = FuncHighlightRules;
    };

    oop.inherits(Mode, TextMode);
    exports.Mode = Mode;
  }
);

ace.define(
  'ace/mode/func_highlight_rules',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextHighlightRules = aceRequire('ace/mode/text_highlight_rules').TextHighlightRules;

    const FuncHighlightRules = function FuncHighlightRules() {
      this.$rules = {
        start: [
          { token: 'comment', regex: /;;[^\n\r]*/ },
          { token: 'comment', regex: /{-/, next: 'multiLineComment' },
          { token: 'string', regex: /(?:(")(?:\\.|(?!\1)[^\\\r\n])*\1(?!\1))/ },
          { token: 'keyword', regex: `\\b(${funcKeywords.join('|')})\\b` },
          /*{ token: 'keyword', regex: /;/ },*/
          { token: 'keyword', regex: /~/ },
          { token: 'keyword', regex: /,/ },
          /*  { token: ['text', 'variable', 'text'], regex: /(.+)(\b\w+\b)(\s*\(.*\).*{)/ },*/
          { token: ['constant', 'text'], regex: /(\b\w+\b)(\s*\()/ },
          { token: 'constant.numeric', regex: '[+-]?\\d+\\b' },
          { caseInsensitive: false }
        ],
        multiLineComment: [
          { token: 'comment', regex: /-}/, next: 'start' },
          { defaultToken: 'comment' }
        ]
      };
    };

    oop.inherits(FuncHighlightRules, TextHighlightRules);

    exports.FuncHighlightRules = FuncHighlightRules;
  }
);
