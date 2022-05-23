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
      /*const keywordMapper = this.createKeywordMapper(
        {
          keyword: 'let if else return fn val struct'
        },
        'text', // default token
        false, // ignore case
        ' ' // split char
      );*/

      this.$rules = {
        start: [
          { token: 'paren.lparen', regex: '[\\[({]' },
          { token: 'paren.rparen', regex: '[\\])}]' },
          {
            token: ['keyword', 'variable.parameter'],
            regex: /(struct\s+)([\w]+)/
          },
          { token: 'variable.parameter', regex: /\bint\b/ },
          { token: 'text', regex: /\w+:\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /struct\s*/, next: 'typeAnnotation' },
          { token: 'keyword', regex: /\blet|if|else|return|fn|val|struct\b/ },
          { token: ['variable', 'text'], regex: /\b([a-z]+[\w_]*\b)(\()/ }, // mb disable
          { token: ['variable.parameter'], regex: /\b[A-Z]+[\w_]*\b/ },
          { caseInsensitive: false }
        ],
        typeAnnotation: [
          { token: 'variable.parameter', regex: /\(/, next: 'genericCall' },
          { token: 'text', regex: /[^\w]/, next: 'start' },
          { defaultToken: 'variable.parameter' }
        ],
        genericCall: [
          { token: 'variable.parameter', regex: /\(/, next: 'genericSubCall' },
          { token: 'variable.parameter', regex: /\)/, next: 'typeAnnotation' },
          { defaultToken: 'variable.parameter' }
        ],
        genericSubCall: [
          { token: 'variable.parameter', regex: /\(/, next: 'genericSubSubCall' },
          { token: 'variable.parameter', regex: /\)/, next: 'genericCall' },
          { defaultToken: 'variable.parameter' }
        ],
        genericSubSubCall: [
          { token: 'variable.parameter', regex: /\)/, next: 'genericSubCall' },
          { defaultToken: 'variable.parameter' }
        ]
      };
    };

    oop.inherits(TactHighlightRules, TextHighlightRules);

    exports.TactHighlightRules = TactHighlightRules;
  }
);
