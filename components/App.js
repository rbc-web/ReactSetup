import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './CSS/App.css';

function App(props){
    return (
        <h1>{'Hello, world!'}</h1>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
