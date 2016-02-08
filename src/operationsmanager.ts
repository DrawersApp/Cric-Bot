import * as matchOperations from './matchoperations'
import {operations} from "./matchoperations";
namespace OperationsManager {
    var operationsMap: {[key: string]: matchOperations.operations}
    export function addToOperationsMap(key: string, operations: matchOperations.operations): void {
        operationsMap[key] = operations;
    }
    export function performOperations(key: string) {
        operationsMap[key].generateCopyObject().makeRestCall();
    }

}
