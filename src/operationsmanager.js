var OperationsManager;
(function (OperationsManager) {
    var operationsMap;
    function addToOperationsMap(key, operations) {
        operationsMap[key] = operations;
    }
    OperationsManager.addToOperationsMap = addToOperationsMap;
    function performOperations(key) {
        operationsMap[key].generateCopyObject().makeRestCall();
    }
    OperationsManager.performOperations = performOperations;
})(OperationsManager || (OperationsManager = {}));
//# sourceMappingURL=operationsmanager.js.map
