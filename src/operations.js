/**
 * Created by harshit on 8/2/16.
 */
/**
 * Created by harshit on 8/2/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
var rest = require('restler');
var cache = require('memory-cache');
var constants = require('./constants');
var client = require('./server');
var matchesString = require('./matchesstring');
var matchString = require('./matchstring');
var matchSummaryString = require('./matchsummarystring');
var stringify = require('json-stable-stringify');
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

    MatchOperations.prototype.makeRestCall = function (input, msg) {
        var matchStringInstance = matchString.getInstance().drawersBotString;
        var elements = matchStringInstance['botStringElem'];
        if (input['operationType'] !== matchStringInstance['operationType']
            || input.size !== matchStringInstance.size) {
            sendMessage(msg, 'Incorrect input', constants.chatType.TEXT);
        }
        var incorrectBreak = false;
        var matchId = '0';
        for (i = 0; i < input['botStringElements'].length; i++) {
            switch (input['botStringElements'][i]['type']) {
                case constants.botStringType.UNEDITABLE:
                    if (stringify(input['botStringElements'][i]) != stringify(matchStringInstance['botStringElements'][i])) {
                        incorrectBreak = true;
                        break;
                    }
                    break;
                case constants.botStringType.STRING:
                    matchId = input['botStringElements'][i]['text'];
                    break;
            }
            if (incorrectBreak) {
                break;
            }
        }
        if (matchId === '0') {
            incorrectBreak = true;
        }
        if (incorrectBreak) {
            sendMessage(msg, "incorrect type", constants.chatType.TEXT);
        } else {
            getUpdateScoreForMatch(matchId, msg)
        }
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

    MatchesOperations.prototype.makeRestCall = function (input, msg) {
        var matchesStringInstance = matchesString.getInstance().drawersBotString;
        var elements = matchesStringInstance['botStringElem'];
        if (input['operationType'] !== matchesStringInstance['operationType']
            || input.size !== matchesStringInstance.size) {
            sendMessage(msg, 'Incorrect input', constants.chatType.TEXT);
        }
        if (stringify(input) === stringify(matchesStringInstance)) {
            fetchAllMatchesScore(msg);
        }
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

    MatchListOperations.prototype.makeRestCall = function (input, msg) {
        var matchListStringInstance = matchSummaryString.getInstance().drawersBotString;
        var elements = matchListStringInstance['botStringElem'];
        if (input['operationType'] !== matchListStringInstance['operationType']
            || input.size !== matchListStringInstance.size) {
            sendMessage(msg, 'Incorrect input', constants.chatType.TEXT);
        }
        if (stringify(input) === stringify(matchListStringInstance)) {
            fetchallMatches(msg);
        }
    };
    MatchListOperations.prototype.generateCopyObject = function () {
        return new MatchListOperations(this);
    };
    return MatchListOperations;
})(operations);
exports.MatchListOperations = MatchListOperations;

function fetchallMatches(msg) {
    var resultString = cache.get("matchesString");
    if (resultString !== null) {
        console.log("Cache hit matchesString" + resultString);
        sendMessage(msg, resultString, constants.chatType.TEXT);
        return
    }
    rest.get('http://cricapp-1206.appspot.com/csa').on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultString = '';
            for (i = 0; i < result.length; i++) {
                resultString = resultString + toUserString(result[i])
            }
            sendMessage(msg, resultString, constants.chatType.TEXT);
            console.log("Cache miss matchesString" + resultString);
            cache.put("matchesString", resultString, 60 * 60 * 1000)
        }
    });
}

function toUserString(indResult) {
    return indResult["id"] + ":" + indResult["t2"] + "-" + indResult["t1"] + "\n"
}

function scoreToUserString(indResut) {
    return "Match:" + indResut["id"] + "\n" + indResut["de"] + "\n" + indResut["si"] + "\n\n"

}
function getUpdateScoreForMatch(match, msg) {
    rest.get('http://cricapp-1206.appspot.com/csa', {
        query: {id: match}
    }).on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultString = '';
            for (i = 0; i < result.length; i++) {
                resultString = resultString + scoreToUserString(result[i])
            }
            sendMessage(msg, resultString, constants.chatType.TEXT)
        }
    });
}

function fetchAllMatchesScore(msg) {
    var resultString = cache.get("matches");
    if (resultString !== null) {
        console.log("Cache hit matches" + resultString);
        getUpdateScoreForMatch(resultString, msg);
        return
    }
    rest.get('http://cricapp-1206.appspot.com/csa').on('complete', function (result) {
        if (result instanceof Error) {
            console.log('Error:', result.message);
            this.retry(5000); // try again after 5 sec
        } else {
            console.log(result);
            resultStringArray = new Array();
            for (i = 0; i < result.length; i++) {
                resultStringArray[i] = result[i]['id']
            }
            resultString = resultStringArray.join("+");
            console.log("Cache miss matches" + resultString);
            getUpdateScoreForMatch(resultString, msg);
            cache.put("matches", resultString, 60 * 60 * 1000)
        }
    });
}

function sendMessage(msg, replyBody, subType) {
    client.client.sendMessage({
        to: msg.from,
        type: 'chat',
        requestReceipt: true,
        id: client.client.nextId(),
        body: replyBody,
        json: {
            subType: subType,
            message: replyBody,
            timestamp: Date.now()
        }
    });
}

