/**
 * Created by harshit on 8/2/16.
 */

import * as outputbody from './outputbody'
import {match} from "./outputbody";
export abstract class operations {
    constructor(operations: operations) {
    }
    abstract makeRestCall(): outputbody.outputbody
    getName():string {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((<any> this).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }
    abstract generateCopyObject(): operations;
}

export class MatchOperations extends operations {
    constructor(operations: MatchOperations) {
        super(operations);
    }
    makeRestCall(): outputbody.outputbody {
        return new outputbody.match("arbit", "arbit", "arbit");
    }
    generateCopyObject(): operations {
        return new MatchOperations(this)
    }
}

export class MatchesOperations extends operations {
    constructor(operations: MatchesOperations) {
        super(operations)
    }
    makeRestCall(): outputbody.outputbody {
        var matchInstance: outputbody.match = new outputbody.match("arbit", "arbit", "arbit");
        var matchesInstance: outputbody.Matches = new outputbody.Matches(new Array<outputbody.match>(matchInstance));
        return matchesInstance;
    }
    generateCopyObject(): operations {
        return new MatchesOperations(this)
    }
}

export class MatchListOperations extends operations {
    constructor(operations: MatchListOperations) {
        super(operations)
    }
    makeRestCall(): outputbody.outputbody {
        var matchInstance: outputbody.MatchSummary = new outputbody.MatchSummary("arbit", "arbit", "arbit");
        var matchesInstance: outputbody.MatchesSummary = new outputbody.MatchesSummary(new Array<outputbody.MatchSummary>(matchInstance));
        return matchesInstance;
    }
    generateCopyObject(): operations {
        return new MatchListOperations(this)
    }
}

