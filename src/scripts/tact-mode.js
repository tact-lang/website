/* eslint-disable import/extensions,angular-functions/explicit-function-return-type */

ace.define(
  'ace/mode/tact',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/tact_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextMode = aceRequire('ace/mode/text').Mode;
    const TactHighlightRules = aceRequire('ace/mode/tact_highlight_rules').TactHighlightRules;

    const Mode = function() {
      this.HighlightRules = TactHighlightRules;
    };

    oop.inherits(Mode, TextMode);
    exports.Mode = Mode;
  }
);

ace.define(
  'ace/mode/tact_highlight_rules',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextHighlightRules = aceRequire('ace/mode/text_highlight_rules').TextHighlightRules;
    const hlNumeric = {
      token: 'constant.numeric',
      regex: /\b(?:0x[0-9a-fA-Z](?:_?[0-9a-fA-Z])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|0\d*|[1-9](?:_?\d)*)\b/,
    };

    // https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode#commonTokens
    // https://cloud9-sdk.readme.io/docs/highlighting-rules
    // https://cloud9-sdk.readme.io/docs/import-a-textmate-theme
    // NOTE:
    // The names for the tokens misrepresent the syntax,
    // but it all somewhat works because the color scheme is patched all over the place.
    const TactHighlightRules = function TactHighlightRules() {
      this.$rules = {
        start: [
          { token: 'comment', regex: /\/\/[^\n\r]*/ },
          { token: 'comment', regex: /\/\*/, next: 'multiLineComment' },
          { token: 'string', regex: /(?:(")(?:\\.|(?!\1)[^\\\r\n])*\1(?!\1))/ },
          { token: ['keyword', 'variable'], regex: /(struct\s+)([\w]+)/ },
          { token: 'text', regex: /[{}[\]();,.:]/ },
          { token: 'keyword', regex: /\b(?:abstract|as|const|contract(?!:)|do|else|extend|extends|fun|get|if|import|initOf|inline|let|message(?!:)|mutates|native|override|primitive|public|repeat|return|self|struct(?!:)|trait(?!:)|until|virtual|while|with)\b/ },
          { token: 'keyword', regex: /\b(?:init|receive|bounced|external)\b(?=\s*\()/ },
          { token: 'variable', regex: /(?<=\bas\s+)(?:coins|remaining|bytes32|bytes64|int257|u?int(?:2[0-5][0-6]|1[0-9][0-9]|[1-9][0-9]?))\b/ },
          { ...hlNumeric },
          { token: 'keyword.operator', regex: /![!=]?|->|[+\-*/%=]=?|[<>]=|<<?|>>?|~|\|[\|=]?|&[&=]?|\^=?|\?/ },
          { token: ['constant', 'text'], regex: /\b([a-z]+[\w_]*\b)(\()/ },
          { token: ['variable'], regex: /\b[A-Z]+[\w_]*\b/ },
          { caseInsensitive: false },
        ],
        multiLineComment: [
          { token: 'comment', regex: /\*\//, next: 'start' },
          { defaultToken: 'comment' }
        ],
        genericCall: [
          { token: 'text', regex: /\(/, next: 'genericSubCall' },
          { token: 'text', regex: /\)/, next: 'typeAnnotation' },
          { defaultToken: 'variable' }
        ],
        genericSubCall: [
          { token: 'text', regex: /\(/, next: 'genericSubSubCall' },
          { token: 'text', regex: /\)/, next: 'genericCall' },
          { defaultToken: 'variable' }
        ],
        genericSubSubCall: [
          { token: 'text', regex: /\)/, next: 'genericSubCall' },
          { defaultToken: 'variable' }
        ]
      };
    };

    oop.inherits(TactHighlightRules, TextHighlightRules);

    exports.TactHighlightRules = TactHighlightRules;
  }
);
