/**
 * Created by harshit on 8/2/16.
 */
var OperationsManager = (function (OperationsManager) {
    var operationsManagerInstance;

    function create() {
        var operationsMap = {};

        function addToOperationsMap(key, operations) {
            operationsMap[key] = operations;
        }

        function performOperations(key, input, msg) {
            operationsMap[key].generateCopyObject().makeRestCall(input, msg);
        }

        return {
            addToOperationsMap: addToOperationsMap,
            performOperations: performOperations
        }
    }

    return {
        getInstance: function () {
            if (!operationsManagerInstance) {
                operationsManagerInstance = create();
            }
            return operationsManagerInstance;
        }
    }

})();
//# sourceMappingURL=operationsmanager.js.map
module.exports = OperationsManager;