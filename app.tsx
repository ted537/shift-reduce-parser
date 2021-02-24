import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
    Container, Button, Box, Typography, 
    Grid, TextField,
    TableBody, TableRow, Table,
    withStyles,
    Step
} from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";

const TableCell = withStyles({
  root: {
    border: '1px solid black'
  }
})(MuiTableCell);


import { ShiftReduceParser } from './ShiftReduceParser';
import { parseProductions, parseInputs } from './input_parsing';

const DEFAULT_PRODUCTIONS = [
    'S=>( A A )', 'A=>a b', 'A=>b a'
].join('\n');
const DEFAULT_INPUT = '( a b b a )';

function Stack({stack}) {
    const rows = stack.map(
        (value,index)=>
            <TableRow key={index}>
                <TableCell>{value}</TableCell>
            </TableRow>
    )

    return <Table><TableBody>{rows}</TableBody></Table>
}

function Parser({parser}) {
    if (!parser) return null;
    return <Grid container justify='space-between'>
        <Grid item>
            <Typography variant="h4">Stack</Typography>
            <Stack stack={parser.stack} />
        </Grid>
        <Grid item>
            <Typography variant="h4">Inputs</Typography>
            <Stack stack={parser.input} />
        </Grid>
    </Grid>
}

const MarginButton = props =>
    <Box m={2}><Button variant="contained" {...props} /></Box>

const applyEv = callback => ev => callback(ev.target.value);

function App() {
    const [productions, setProductions] = useState(DEFAULT_PRODUCTIONS);
    const [input, setInput] = useState(DEFAULT_INPUT);
    const [parser, setParser] = useState(null);

    const [parserState, setParserState] = useState(null);

    const createParser = ()=> {
        const parsedProductions = parseProductions(productions);
        const parsedInputs = parseInputs(input);
        const parser = new ShiftReduceParser(parsedProductions, parsedInputs);
        setParser(parser);
        setParserState(parser.state());
    }

    const step = () => {
        parser.step();
        setParserState(parser.state());
    }

    return<Container>
        <Typography variant='h4'>Productions</Typography>
        <TextField fullWidth multiline variant="outlined"
            value={productions} 
            onChange={applyEv(setProductions)}
        />
        <Typography variant='h4'>Inputs</Typography>
        <TextField fullWidth variant="outlined" value={input}
            onChange={applyEv(setInput)}
        />
        <Box display="flex" justifyContent="center" m={1}>
            <MarginButton onClick={createParser}>Create</MarginButton>
            <MarginButton onClick={step}>Step</MarginButton>
        </Box>
        <Parser parser={parserState} />
    </Container>
}

ReactDOM.render(<App />, document.getElementById('app'));