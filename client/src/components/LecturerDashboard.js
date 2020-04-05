import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import uniqid from 'uniqid'
import io from 'socket.io-client'
import {Card, Spin} from 'antd';
import ChatroomLecturer from "./ChatroomLecturer"
import WhiteBoard from "./WhiteBoard"
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


class LecturerDashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            socket: null,
            id: null
        }
    }

    componentDidMount(){
        const id = uniqid()
        const socket = io("http://localhost:5000/");
        socket.emit("joinroom",id)
        socket.on("hand",(arg)=>{
            // console.log(arg+' raised hand')
        })
        socket.on("joinnotif",(arg)=>{
            // console.log(arg+" joined")
        })
        
        this.setState({
            socket: socket,
            id: id
        })

    }

    render(){

        if(this.state.socket === null || this.state.id === null){
            return <Spin indicator={antIcon} />
        }
        
        const {socket, id} = this.state

        const welcomeTitle = "Welcome to Room " + id + ", Lecturer";
        
        return(
            
            <div className="position-relative">
              <section className="section section-lg section-shaped pb-250">
                <div className="shape shape-style-1 shape-default">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                <Card title={<h1>{welcomeTitle}</h1>} bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '5%', marginRight:'5%'}}>
                    <Card.Grid style={{ width: '50%', textAlign: 'center', borderRadius:'15px' }}>
                        <WhiteBoard />
                    </Card.Grid>
                    <Card.Grid style={{ width: '50%', textAlign: 'center', borderRadius:'15px' }}>
                        <ChatroomLecturer name={"Lecturer"} socket={this.state.socket} roomID={id} />
                    </Card.Grid>
                </Card>

              </section>

            </div>
            
        )
    }
}

export default withRouter(LecturerDashboard);