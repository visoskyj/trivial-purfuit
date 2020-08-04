import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './styles/board.css';
import Client from './views/client/Client';
import ConfigureGame from './views/ConfigureGame/ConfigureGame';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Client />
                </Route>
                <Route path="/config">
                    <ConfigureGame />
                </Route>
            </Switch>
        </Router>
    )
}

export default App;