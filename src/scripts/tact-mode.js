/* eslint-disable import/extensions,angular-functions/explicit-function-return-type */

ace.define(
  'ace/mode/tact',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/tact_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextMode = aceRequire('ace/mode/text').Mode;
    const TactHighlightRules = aceRequire('ace/mode/tact_highlight_rules').TactHighlightRules;

    const Mode = function () {
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

    const TactHighlightRules = function TactHighlightRules() {
      this.$rules = {
        start: [
          { token: 'comment', regex: /\/\/[^\n\r]*/ },
          { token: 'comment', regex: /\/\*/, next: 'multiLineComment' },
          {
            token: ['keyword', 'variable'],
            regex: /(struct\s+)([\w]+)/
          },
          { token: 'text', regex: /\w+:\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /struct\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /\b(?:abstract|as|const|contract(?!:)|do|else|extend|extends|fun|get|if|import|initOf|inline|let|message(?!:)|mutates|native|override|primitive|public|repeat|return|self|struct(?!:)|trait(?!:)|until|virtual|while|with)\b/ },
          {token: 'keyword', regex: /\b(?:init|receive|bounced|external)\b/},
          { token: ['constant', 'text'], regex: /\b([a-z]+[\w_]*\b)(\()/ },
          { token: ['variable'], regex: /\b[A-Z]+[\w_]*\b/ },
          { caseInsensitive: false },
          
        ],
        multiLineComment: [
          { token: 'comment', regex: /\*\//, next: 'start' },
          { defaultToken: 'comment' }
        ],
        typeAnnotation: [
          { token: 'text', regex: /\(/, next: 'genericCall' },
          { token: 'text', regex: /[^\w]/, next: 'start' },
          { defaultToken: 'variable' }
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
