import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
    Container, Button, Box, Typography, 
    ThemeProvider, createMuiTheme, TextareaAutosize, Input, TextField
} from '@material-ui/core';

const DEFAULT_PRODUCTIONS = [
    'S=>(A)', 'A=>a b', 'A=>b a'
].join('\n');
const DEFAULT_INPUT = '( a b b a )';

function Parser({parser}) {
    if (!parser) return null;
    return <div className="columns">
        <div>Column1</div>
        <div>Column2</div>
    </div>
}

function App() {
    const [productions, setProductions] = useState(DEFAULT_PRODUCTIONS);
    const [input, setInput] = useState(DEFAULT_INPUT);
    const [parser, setParser] = useState(null);

    return<Container>
        <Typography variant='h4'>Productions</Typography>
        <TextField fullWidth multiline variant="outlined"
            rows={5} value={productions} 
            onChange={ev=>setProductions(ev.target.value)}
        />
        <Typography variant='h4'>Inputs</Typography>
        <TextField fullWidth variant="outlined" value={input}
            onChange={ev=>setInput(ev.target.value)} 
        />
        <Box display="flex" justifyContent="center" m={1}>
            <Button variant="contained">Create</Button>
        </Box>
        <h1>Parser</h1>
        <Parser parser={parser} />
    </Container>
}

ReactDOM.render(<App />, document.getElementById('app'));