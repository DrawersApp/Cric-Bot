/**
 * Created by harshit on 8/2/16.
 */
export abstract class outputbody {
    constructor() {
    }
    abstract toUserString(): string;
}

export class match extends outputbody {
    id: string;
    de: string;
    si: string;

    constructor(id:string, de:string, si:string) {
        super();
        this.id = id;
        this.de = de;
        this.si = si;
    }
    toUserString(): string {
        return JSON.stringify(this);
    }
}

export class Matches extends outputbody {
    matches: Array<match>
    constructor(matches: Array<match>) {
        super();
        this.matches = matches;
    }
    toUserString(): string {
        return JSON.stringify(this);
    }
}

export class MatchSummary {
    id: string;
    t1: string;
    t2: string;
    constructor(id:string, t1:string, t2:string) {
        this.id = id;
        this.t1 = t1;
        this.t2 = t2;
    }
}

export class MatchesSummary extends outputbody {
    matches: Array<MatchSummary>
    constructor(matches: Array<MatchSummary>) {
        super();
        this.matches = matches;
    }
    toUserString(): string {
        return JSON.stringify(this);
    }
}