import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import uniqid from 'uniqid'
import io from 'socket.io-client'
import {Card, Spin} from 'antd';
import ChatroomLecturer from "./ChatroomLecturer"
import WhiteBoard from "./WhiteBoard"
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

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
        const socket = io("/");
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

        const room = {
            room_id: id
        }
        axios.post('/classes/add', room)
        .then(mongoRes => {
            console.log(mongoRes)
        })
        
        var constraints = { audio: true };
        navigator.mediaDevices.getUserMedia(constraints).then( (mediaStream) => {
            var mediaRecorder = new MediaRecorder(mediaStream);
            var chunks = []
            mediaRecorder.onstart = (e) => {
                chunks = [];
            };
            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            mediaRecorder.onstop = (e) => {
                var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                chunks = [];
                socket.emit('record', blob, this.state.id);
            };

            // Start recording
            mediaRecorder.start();

            // Stop recording after 5 seconds and broadcast it to server
            setInterval(function() {
                mediaRecorder.stop()
                mediaRecorder.start()
            }, 5000);
            
        });

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
                        <WhiteBoard socket = {socket} roomID = {id}/>
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