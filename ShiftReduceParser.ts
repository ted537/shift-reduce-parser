import {arrayEquals} from './array.ts';

type Token = string;
export interface Production {
    consumes: Token;
    produces: Token[];
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

    findProduction() {
        return findProduction(this.productions,this.stack);
    }

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
        const production = this.findProduction();
        if (production) this.reduce(production);
        else this.shift();
    }

    parse() {
        while (this.findProduction() || this.input.length>0) this.step();
    }
}