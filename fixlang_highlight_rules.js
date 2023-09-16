define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    // var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var FixlangHighlightRules = function () {
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": ("if|else|do|let|in|eval"),
            "keyword.other": ("import"),
            "constant.language": ("true|false|nullptr"),
            "storage.type": ("type|struct|union|module|namespace|impl|trait"),
            "storage.modifier": ("box|unbox"),
        }, "identifier");

        this.$rules = {
            "start": [
                {
                    // line ends with "//"
                    token: "comment.line",
                    regex: /\/\/$/,
                    next: "start"
                },
                {
                    // "//"
                    token: "comment.line",
                    regex: /\/\//,
                    next: "singleLineComment"
                },
                {
                    // "/*"
                    token: "comment.block",
                    regex: /\/\*/,
                    next: "multiLineComment"
                },
                {
                    // functional operators
                    token: "keyword.operator",
                    regex: /\->|\.|\$|>>|<</
                },
                {
                    // numeric constants
                    token: "constant.numeric",
                    regex: /\b(\-)?[0-9]+(\.[0-9]+)?(e[\+|\-]?[0-9]+)?/
                },
                {
                    // types, traits, namespaces
                    token: "support.class",
                    regex: /\b[A-Z][A-Za-z0-9]*/
                },
                {
                    // string literal
                    token: "string.double",
                    regex: /"/,
                    next: "stringLiteral"
                },
                {
                    // lparen
                    token: "paren.lparen",
                    regex: "[[({]"
                },
                {
                    // rparen
                    token: "paren.rparen",
                    regex: "[\\])}]"
                },
                {
                    // keywords
                    token: keywordMapper,
                    regex: /[a-z]+/
                },
                {
                    defaultToken: 'text'
                }
            ],
            "multiLineComment": [
                {
                    // "*/"
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
                    // end of line
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
                    // escaped double quote
                    token: "string.double",
                    regex: /\\"/,
                    next: "stringLiteral"
                },
                {
                    // double quote
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