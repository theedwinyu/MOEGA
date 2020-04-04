import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import { Card, Button, Divider } from 'antd';

const { Meta } = Card;

class Home extends Component{
    constructor(){
        super();
        this.state = {
            joinRedirect: false, 
            createRedirect: false
        };
    }

    joinRoomClick = () => {
        console.log("Redirecting to join room page");
        this.setState({joinRedirect:true, createRedirect: false});
    }

    createRoomClick = () => {
        console.log("Redirecting to create room page");
        this.setState({createRedirect: true, joinRedirect: false});
    }

    render(){

        if(this.state.joinRedirect){
            return <Redirect to={{ pathname: '/join'}} />
        }
        
        if(this.state.createRedirect){
            return <Redirect to={{ pathname: '/lecturer'}} />
        }

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
                <Card bordered={true} style={{ backgroundColor:'white', borderRadius:'15px'}}>
                <Meta
                    title={<h1>Making Online Education Great Again</h1>}
                    style={{color:'#1A2E33', textAlign:'center'}}
                />

                <Divider/>
                <Button onClick={this.joinRoomClick}>Join Room</Button>
                <br></br>
                <br></br>
                <Button onClick={this.createRoomClick}>Create Room</Button>
                </Card>
            </div>
                
            </section>
            
        )
    }
}

export default Home;