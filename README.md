Drawers node bot based on node sdk.


![Cricket Bot](https://github.com/DrawersApp/Cric-Bot/blob/master/cricket.gif)
```
Instructions to run bot:
1. Install node 4.0.
2. npm install
3. npm start
```

## Terminologies:
Every bot needs an operation and a help string to show to the client.
```
1. QA String - A string given to the client to make the decision. In the bot above it is match, matches and summary.
2. Operations - What is the operation for a particular help string. Ex - Sending match qa string gives the scorecard of a particular match.
``` 

## Extending the cricket bot:
Adding a new operation which returns the match metadata (okay its same as summary :) ). Lets call it metadata. Everytime a client calls metadata with match id it returns back the summary.

### Writing the operations - Sample operations can be found at operations.js.
```javascript
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
``` 

### Writing the string. Make it singleton and register it to operationsmanager (to automatically pick up the execution on run time) and drawers botstring help to generate the string to be shown to client.
``` javascript
var DrawersBotString = require("./drawersBotString")
var constants = require('./constants')
var BotStringElem = require('./botStringElements')
var DrawersBotStringHelp = require('./drawersBotStringHelp')
var operationsManager = require('./operationsmanager')
var operations = require('./operations')
var matchOperationsString = (function () {

    var matchOperationsStringInstance;

    function create() {

        var botStringElem = new BotStringElem(constants.botStringType.UNEDITABLE, "Matches", "Matches", []);
        var botStringElements = [];
        botStringElements.push(botStringElem);
        var drawersBotString = new DrawersBotString(constants.operationType.MATCHES, botStringElements);
        DrawersBotStringHelp.getInstance().addElement(drawersBotString);
        operationsManager.getInstance().addToOperationsMap(constants.operationType.MATCHES, new operations.MatchesOperations(null));
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
```

Update the string on search, run your server, sit down and enjoy the beer. 
