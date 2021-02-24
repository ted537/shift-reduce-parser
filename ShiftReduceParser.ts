type Token = string;
interface Production {
    consumes: Token;
    produces: Token[];
}

function arrayEquals<T>(a:T[], b:T[]) {
    if (a.length !== b.length) return false;
    for (let i=0;i<a.length;++i) {
        if (a!=b) return false;
    }
    return true;
}

function stackEndsWith(stack: Token[], production: Production): Boolean {
    const top = stack.slice(stack.length-production.produces.length);
    return arrayEquals(top,production.produces);
}

function findProduction(productions: Production[], stack: Token[]): Production {
    return productions.find(
        production=>stackEndsWith(stack,production)
    )
}

class ShiftReduceParser {
    stack: Token[] = [];
    
    constructor(
        readonly productions: Production[], 
        public input: Token[]
    ) {}

    reduce(production: Production) {

    }

    shift() {
        if (this.input.length>0) {
            this.stack.push(this.input.shift());
        }
    }
    
    step() {
        const production = findProduction(this.productions, this.stack);

        if (production) this.reduce(production);
        else this.shift();
    }
}