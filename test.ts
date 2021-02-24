import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";
import {ShiftReduceParser} from './ShiftReduceParser.ts';

Deno.test("parser shifts", ()=>{
    const parser = new ShiftReduceParser([],['a','b']);
    assertEquals(parser.stack,[]);
    parser.step();
    assertEquals(parser.stack,['a']);
})