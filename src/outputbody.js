var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by harshit on 8/2/16.
 */
var outputbody = (function () {
    function outputbody() {
    }
    return outputbody;
})();
exports.outputbody = outputbody;
var match = (function (_super) {
    __extends(match, _super);
    function match(id, de, si) {
        _super.call(this);
        this.id = id;
        this.de = de;
        this.si = si;
    }
    match.prototype.toUserString = function () {
        return JSON.stringify(this);
    };
    return match;
})(outputbody);
exports.match = match;
var Matches = (function (_super) {
    __extends(Matches, _super);
    function Matches(matches) {
        _super.call(this);
        this.matches = matches;
    }
    Matches.prototype.toUserString = function () {
        return JSON.stringify(this);
    };
    return Matches;
})(outputbody);
exports.Matches = Matches;
var MatchSummary = (function () {
    function MatchSummary(id, t1, t2) {
        this.id = id;
        this.t1 = t1;
        this.t2 = t2;
    }
    return MatchSummary;
})();
exports.MatchSummary = MatchSummary;
var MatchesSummary = (function (_super) {
    __extends(MatchesSummary, _super);
    function MatchesSummary(matches) {
        _super.call(this);
        this.matches = matches;
    }
    MatchesSummary.prototype.toUserString = function () {
        return JSON.stringify(this);
    };
    return MatchesSummary;
})(outputbody);
exports.MatchesSummary = MatchesSummary;
//# sourceMappingURL=outputbody.js.map