var drawersBotString = require("./drawersBotString")
var constants = require('./constants')
var botStringElem = require('./botStringElem')
var drawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./opmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;
    function create () {

        var botStringElem = new botStringElem.bse(constants.botStringType.UNEDITABLE, "match", "match", []);
        var botStringElem1 = new botStringElem.bse(constants.botStringType.STRING, "91435", null, []);
        var botStringElems = [];
        botStringElems.push(botStringElem);
        botStringElems.push(botStringElem1);
        var drawersBotString  = new drawersBotString.drawersBotString(constants.operationType.MATCH, botStringElems);
        drawersBotStringHelp.getInstance().addElement(drawersBotString);
        operationsManager.addToOperationsMap(constants.operationType.MATCH, new operations.MatchOperations(null));
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