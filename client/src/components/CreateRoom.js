import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import { Card, Button } from 'antd';

class CreateRoom extends Component{
    constructor(){
        super();
    }

    render(){

        return(

                <section className="section section-shaped section-lg">
                    <div className="shape shape-style-1 bg-gradient-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>

                <div className="App-header">
                    <h1>Creating Room</h1>
                </div>
                    
                </section>
            
        )
    }
}

export default CreateRoom;