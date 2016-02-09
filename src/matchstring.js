var DrawersBotString = require("./drawersBotString")
var constants = require('./constants')
var BotStringElem = require('./botStringElements')
var DrawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./operationsmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;

    function create() {

        var botStringElem = new BotStringElem(constants.botStringType.UNEDITABLE, "Match", "Match", []);
        var botStringElem1 = new BotStringElem(constants.botStringType.STRING, "91435", null, []);
        var botStringElems = [];
        botStringElems.push(botStringElem);
        botStringElems.push(botStringElem1);
        var drawersBotString = new DrawersBotString(constants.operationType.MATCH, botStringElems);
        DrawersBotStringHelp.getInstance().addElement(drawersBotString);
        operationsManager.getInstance().addToOperationsMap(constants.operationType.MATCH, new operations.MatchOperations(null));
        return {
            // public + private states and behaviors
            drawersBotString: drawersBotString
        };
    }

    return {
        getInstance: function () {
            if (!matchOperationsStringInstance) {
                matchOperationsStringInstance = create();
            }
            return matchOperationsStringInstance;
        }
    };
})();
module.exports = matchOperationsString;