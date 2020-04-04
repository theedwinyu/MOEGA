import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './components/Home.js';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import StudentDashboard from './components/StudentDashboard.js';
import LecturerDashboard from './components/LecturerDashboard';

function App() {
    return (
        <div className="App">

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

            <Router>
                <Switch>

                    <Route path="/join">
                    <JoinRoom />
                    </Route>

                    <Route path="/create">
                    <CreateRoom />
                    </Route>
                
                    <Route path="/">
                    <Home />
                    </Route>

                </Switch>
            </Router>

        </div>
    );
}

export default App;
