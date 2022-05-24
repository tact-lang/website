/* eslint-disable import/extensions,angular-functions/explicit-function-return-type */

ace.define(
  'ace/mode/custom',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/tact_highlight_rules'],
  (aceRequire, exports) => {
    const oop = aceRequire('ace/lib/oop');
    const TextMode = aceRequire('ace/mode/text').Mode;
    const TactHighlightRules = aceRequire('ace/mode/tact_highlight_rules').TactHighlightRules;

    const Mode = function () {
      this.HighlightRules = TactHighlightRules;
    };

    oop.inherits(Mode, TextMode);

    /* (function () {
      this.lineCommentStart = ';;';
      this.blockComment = { start: '{-', end: '-}' };
    }.call(Mode.prototype));*/

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
          {
            token: ['keyword', 'variable'],
            regex: /(struct\s+)([\w]+)/
          },
          { token: 'text', regex: /\w+:\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /struct\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /\blet|if|else|return|fn|val|struct\b/ },
          { token: ['constant', 'text'], regex: /\b([a-z]+[\w_]*\b)(\()/ }, // mb disable
          { token: ['variable'], regex: /\b[A-Z]+[\w_]*\b/ },
          { caseInsensitive: false }
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
