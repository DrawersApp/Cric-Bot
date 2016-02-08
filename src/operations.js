/**
 * Created by harshit on 8/2/16.
 */
/**
 * Created by harshit on 8/2/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var outputbody = require('./opbody');
var operations = (function () {
    function operations(operations) {
    }
    operations.prototype.getName = function () {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(this.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    };
    return operations;
})();
exports.operations = operations;
var MatchOperations = (function (_super) {
    __extends(MatchOperations, _super);
    function MatchOperations(operations) {
        _super.call(this, operations);
    }
    MatchOperations.prototype.makeRestCall = function (input) {
        return new outputbody.match("arbit", "arbit", "arbit");
    };
    MatchOperations.prototype.generateCopyObject = function () {
        return new MatchOperations(this);
    };
    return MatchOperations;
})(operations);
exports.MatchOperations = MatchOperations;
var MatchesOperations = (function (_super) {
    __extends(MatchesOperations, _super);
    function MatchesOperations(operations) {
        _super.call(this, operations);
    }
    MatchesOperations.prototype.makeRestCall = function (input) {
        var matchInstance = new outputbody.match("arbit", "arbit", "arbit");
        var matchesInstance = new outputbody.Matches(new Array(matchInstance));
        return matchesInstance;
    };
    MatchesOperations.prototype.generateCopyObject = function () {
        return new MatchesOperations(this);
    };
    return MatchesOperations;
})(operations);
exports.MatchesOperations = MatchesOperations;
var MatchListOperations = (function (_super) {
    __extends(MatchListOperations, _super);
    function MatchListOperations(operations) {
        _super.call(this, operations);
    }
    MatchListOperations.prototype.makeRestCall = function (input) {
        var matchInstance = new outputbody.MatchSummary("arbit", "arbit", "arbit");
        var matchesInstance = new outputbody.MatchesSummary(new Array(matchInstance));
        return matchesInstance;
    };
    MatchListOperations.prototype.generateCopyObject = function () {
        return new MatchListOperations(this);
    };
    return MatchListOperations;
})(operations);
exports.MatchListOperations = MatchListOperations;
//# sourceMappingURL=matchoperations.js.map