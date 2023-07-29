define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    // var Tokenizer = require("../tokenizer").Tokenizer;

    var FixlangHighlightRules = require("./fixlang_highlight_rules").FixlangHighlightRules;

    var Mode = function () {
        this.HighlightRules = FixlangHighlightRules;
    };
    oop.inherits(Mode, TextMode);

    exports.Mode = Mode;
});
