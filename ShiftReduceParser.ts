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

function hasProduction(line:string): boolean {
    return line.includes('=>');
}

function parseProduction(line:string): Production {
    const [before,after] = line.split('=>',2);
    const consumes = before.trim();
    const produces = after.split(' ').filter(Boolean);
    return {consumes, produces};
}

export function parseProductions(paragraph:string): Production[] {
    const lines =  paragraph.split('\n');
    const linesWithProdutions = lines.filter(hasProduction);
    const productions = linesWithProdutions.map(parseProduction);
    return productions;
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