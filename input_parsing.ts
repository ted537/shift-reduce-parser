import {Token, Production} from './ShiftReduceParser.ts';

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

export function parseInputs(text:string): Token[] {
    return text.split(' ').filter(Boolean);
}