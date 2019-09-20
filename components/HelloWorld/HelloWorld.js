import React, {useState, useEffect} from 'react';
import css from 'nameOfYourApp/components/HelloWorld/CSS/HelloWorld.css';

function App(props){
    return (
        <h1 className={css.helloWorld}>{'Hello, World!'}</h1>
    );
}

export default App;
