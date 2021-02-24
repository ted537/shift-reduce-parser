import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import {ShiftReduceParser} from './ShiftReduceParser.ts';
import {parseProductions, parseInputs} from './input_parsing.ts';

Deno.test("shift reduce parser shifts", ()=>{
    const parser = new ShiftReduceParser([],['a','b']);
    assertEquals(parser.stack,[]);
    parser.step();
    assertEquals(parser.stack,['a']);
});

Deno.test("shift reduce parser reduces", ()=>{
    const parser = new ShiftReduceParser([{consumes:'A',produces:['a']}],['a']);
    assertEquals(parser.stack,[]);
    parser.step();
    assertEquals(parser.stack,['a']);
    parser.step();
    assertEquals(parser.stack,['A']);
});

Deno.test("parses production from line",()=>{
    const parsed = parseProductions('A=>a');
    assertEquals(parsed,[{consumes:'A',produces:['a']}]);
});

Deno.test("parses productions from lines",()=>{
    const parsed = parseProductions('A=>a b\nB=>b a');
    assertEquals(parsed,[
        {consumes:'A',produces:['a','b']},
        {consumes:'B',produces:['b','a']}
    ]);
});

Deno.test("parsed token from line",()=>{
    const parsed = parseInputs('a b  b a');
    assertEquals(parsed, ['a','b','b','a']);
});

Deno.test("shift reduce parser parses",()=>{
    const parser = new ShiftReduceParser([
        {consumes:'S',produces:['A','A']},
        {consumes:'A',produces:['a','b']},
        {consumes:'A',produces:['b','a']}
    ], ['a','b','b','a']);
    parser.parse();
    assertEquals(parser.stack,['S']);
});