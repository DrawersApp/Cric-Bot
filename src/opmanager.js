/**
 * Created by harshit on 8/2/16.
 */
var drawersBotString = require('./drawersBotString')
var OperationsManager;
(function (OperationsManager) {
    var operationsMap;
    function addToOperationsMap(key, operations) {
        operationsMap[key] = operations;
    }
    OperationsManager.addToOperationsMap = addToOperationsMap;
    function performOperations(key, input) {
        operationsMap[key].generateCopyObject().makeRestCall(input);
    }
    OperationsManager.performOperations = performOperations;
})(OperationsManager || (OperationsManager = {}));
//# sourceMappingURL=operationsmanager.js.map
module.exports = OperationsManager;