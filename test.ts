import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import {ShiftReduceParser, parseProduction} from './ShiftReduceParser.ts';

Deno.test("shift reduce parser shifts", ()=>{
    const parser = new ShiftReduceParser([],['a','b']);
    assertEquals(parser.stack,[]);
    parser.step();
    assertEquals(parser.stack,['a']);
})

Deno.test("shift reduce parser reduces", ()=>{
    const parser = new ShiftReduceParser([{consumes:'A',produces:['a']}],['a']);
    assertEquals(parser.stack,[]);
    parser.step();
    assertEquals(parser.stack,['a']);
    parser.step();
    assertEquals(parser.stack,['A']);
})

Deno.test("parses production from line",()=>{
    const parsed = parseProduction('A=>a');
    assertEquals(parsed,{consumes:'A',produces:['a']})
})

Deno.test("parses productions from line",()=>{
    const parsed = parseProduction('A=>a b');
    assertEquals(parsed,{consumes:'A',produces:['a','b']})
})