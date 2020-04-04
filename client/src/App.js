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
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';

function App() {
    return (
        <div className="App">

            <Router>
                <Switch>

                    <Route path="/join">
                    <JoinRoom />
                    </Route>
                    
                    <Route path="/student">
                    <StudentDashboard />
                    </Route>

                    <Route path="/lecturer">
                    <LecturerDashboard />
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
