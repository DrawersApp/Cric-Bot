var drawersBotString = require("./drawersBotString")
var constants = require('./constants')
var botStringElem = require('./botStringElem')
var drawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./opmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;
    function create () {

        var botStringElem = new botStringElem.bse(constants.botStringType.STRING, "match", "match", []);
        var botStringElems = [];
        botStringElems.push(botStringElem);
        var drawersBotString  = new drawersBotString.drawersBotString(constants.operationType.MATCH, botStringElems);
        drawersBotStringHelp.getInstance().addElement(drawersBotStringHelp);
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
