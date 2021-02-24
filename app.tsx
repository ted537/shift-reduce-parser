import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import 'style.css';
import './style.css';

const DEFAULT_PRODUCTIONS = [
    'S=>(A)', 'A=>a b', 'A=>b a'
].join('\n');
const DEFAULT_INPUT = '( a b b a )';

function App() {
    const [productions, setProductions] = useState(DEFAULT_PRODUCTIONS);
    const [input, setInput] = useState(DEFAULT_INPUT);
    return <div className="container">
        <h2>Productions</h2>
        <textarea className="wide" rows={5} value={productions}></textarea>
        <h2>Inputs</h2>
        <input className="wide" value={input} />
        <h1>Parser</h1>
        <div className="columns">
            <div>Column1</div>
            <div>Column2</div>
        </div>
    </div>
}

ReactDOM.render(<App />, document.getElementById('app'));