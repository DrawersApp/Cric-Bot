/**
 * Created by harshit on 9/2/16.
 */
var DrawersBotString = require("./drawersBotString")
var constants = require('./constants')
var BotStringElem = require('./botStringElements')
var DrawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./operationsmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;

    function create() {

        var botStringElem = new BotStringElem(constants.botStringType.UNEDITABLE, "Summmary", "Summary", []);
        var botStringElems = [];
        botStringElems.push(botStringElem);
        var drawersBotString = new DrawersBotString(constants.operationType.SUMMARY, botStringElems);
        DrawersBotStringHelp.getInstance().addElement(drawersBotString);
        operationsManager.getInstance().addToOperationsMap(constants.operationType.SUMMARY, new operations.MatchListOperations(null));
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