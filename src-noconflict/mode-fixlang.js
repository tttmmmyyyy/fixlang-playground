ace.define("ace/mode/fixlang_highlight_rules", [], function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var FixlangHighlightRules = function () {
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": ("if|else|do|let|in"),
            "keyword.other": ("import"),
            "constant.language": ("true|false|nullptr"),
            "storage.type": ("type|struct|union|module|namespace|impl|trait"),
            "storage.modifier": ("box|unbox"),
        }, "identifier");

        this.$rules = {
            "start": [
                {
                    token: "comment.line",
                    regex: /\/\/$/,
                    next: "start"
                },
                {
                    token: "comment.line",
                    regex: /\/\//,
                    next: "singleLineComment"
                },
                {
                    token: "comment.block",
                    regex: /\/\*/,
                    next: "multiLineComment"
                },
                {
                    token: "keyword.operator",
                    regex: /\->|\.|\$|>>|<</
                },
                {
                    token: "constant.numeric",
                    regex: /[^a-zA-Z0-9](\-)?[0-9]+(\.[0-9]+)?(e[\+|\-]?[0-9]+)?/
                },
                {
                    token: "support.class",
                    regex: /(^|\s)[A-Z][A-Za-z0-9]*/
                },
                {
                    token: "string.double",
                    regex: /"/,
                    next: "stringLiteral"
                },
                {
                    token: "paren.lparen",
                    regex: "[[({]"
                },
                {
                    token: "paren.rparen",
                    regex: "[\\])}]"
                },
                {
                    token: keywordMapper,
                    regex: /[a-z]+/
                },
                {
                    defaultToken: 'text'
                }
            ],
            "multiLineComment": [
                {
                    token: "comment.block",
                    regex: "\\*\\/",
                    next: "start"
                },
                {
                    defaultToken: "comment.block"
                }
            ],
            "singleLineComment": [
                {
                    token: "comment.line",
                    regex: /$/,
                    next: "start"
                },
                {
                    defaultToken: "comment.line"
                }
            ],
            "stringLiteral": [
                {
                    token: "string.double",
                    regex: /\\"/,
                    next: "stringLiteral"
                },
                {
                    token: "string.double",
                    regex: /"/,
                    next: "start"
                },
                {
                    defaultToken: "string.double"
                }
            ]
        };
    };

    oop.inherits(FixlangHighlightRules, TextHighlightRules);
    exports.FixlangHighlightRules = FixlangHighlightRules;
});

ace.define("ace/mode/fixlang", [], function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;

    var FixlangHighlightRules = require("./fixlang_highlight_rules").FixlangHighlightRules;

    var Mode = function () {
        this.HighlightRules = FixlangHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
}); (function () {
    ace.require(["ace/mode/fixlang"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
