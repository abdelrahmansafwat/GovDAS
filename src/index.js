import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <Routes />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);