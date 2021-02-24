type Token = string;
interface Production {
    consumes: Token;
    produces: Token[];
}

function arrayEquals<T>(a:T[], b:T[]) {
    if (a.length !== b.length) return false;
    for (let i=0;i<a.length;++i) {
        if (a[i]!=b[i]) return false;
    }
    return true;
}

function stackEndsWith(stack: Token[], production: Production): boolean {
    const top = stack.slice(stack.length-production.produces.length);
    return arrayEquals(top,production.produces);
}

function findProduction(
    productions: Production[], stack: Token[]
): Production | undefined {
    
    return productions.find(
        production=>stackEndsWith(stack,production)
    )
}

export class ShiftReduceParser {
    stack: Token[] = [];
    
    constructor(
        readonly productions: Production[], 
        public input: Token[]
    ) {}

    reduce(production: Production) {
        const beforeLength = this.stack.length - production.produces.length;
        const before = this.stack.slice(0,beforeLength);
        this.stack = before.concat(production.consumes);
    }

    shift() {
        if (this.input.length>0) {
            this.stack.push(this.input.shift() as string);
        }
    }
    
    step() {
        const production = findProduction(this.productions, this.stack);

        if (production) this.reduce(production);
        else this.shift();
    }
}