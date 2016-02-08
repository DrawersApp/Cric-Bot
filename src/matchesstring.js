/**
 * Created by harshit on 8/2/16.
 */
var drawersBotString = require("./drawersBotString")
var constants = require('./constants')
var botStringElem = require('./botStringElem')
var drawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./opmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;
    function create () {

        var botStringElem = new botStringElem.bse(constants.botStringType.UNEDITABLE, "matches", "matches", []);
        var botStringElems = [];
        botStringElems.push(botStringElem);
        var drawersBotString  = new drawersBotString.drawersBotString(constants.operationType.SCORE, botStringElems);
        drawersBotStringHelp.getInstance().addElement(drawersBotString);
        operationsManager.addToOperationsMap(constants.operationType.SCORE, new operations.MatchesOperations(null));
        return {
            // public + private states and behaviors
            drawersBotString: drawersBotString
        };
    }

    return {
        getInstance: function() {
            if(!matchOperationsStringInstance) {
                matchOperationsStringInstance = create();
            }
            return matchOperationsStringInstance;
        }
    };
})();
module.exports.matchOperationsString = matchOperationsString;