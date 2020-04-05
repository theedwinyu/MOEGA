import React, { Component } from 'react';
import io from 'socket.io-client'
import ml5 from 'ml5'
import {Redirect, withRouter} from "react-router-dom"
import {Card, Spin} from 'antd';
import Chatroom from "./Chatroom"
import WhiteBoard from "./WhiteBoard"
import { LoadingOutlined } from '@ant-design/icons';

const { Meta } = Card;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class StudentDashboard extends Component{

    constructor(props){
        super(props)
        this.state = {
            socket: null
        }
    }

    componentDidMount(){

        const socket = io("http://localhost:5000/");
        socket.emit("joinroom",this.props.location.state.values.roomID)
        socket.emit("joinnotif",this.props.location.state.values.roomID,this.props.location.state.values.name)
        socket.on("whiteboard",(dat)=>{
            console.log("fuck")
            var wbCanvas = document.getElementById('whiteboard')
            var ctx = wbCanvas.getContext('2d')
            ctx.clearRect(0, 0, wbCanvas.width, wbCanvas.height);
            var img = new Image
            img.onload = ()=>{
                ctx.drawImage(img,0,0)
            }
            img.src = dat

        })

        socket.on('voice', (arrayBuffer) => {
            var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
            var audio = document.createElement('audio');
            audio.src = window.URL.createObjectURL(blob);
            audio.play();
        });

        this.setState({ socket })

        const video = document.getElementById('video')
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(function (stream) {
                video.srcObject = stream;
                video.play();
              })
              .catch(function (err0r) {
                // console.log(err0r);
            });
        }

        const poseNet = ml5.poseNet(video,"single", modelLoaded);
        function modelLoaded() {
            // console.log('Model Loaded!');
        }
        poseNet.on('pose', (poses) => {
            if(poses){
                let pose = poses[0].pose;
                checkHandsUp(pose,this.props.location.state.values.roomID,this.props.location.state.values.name)
            }
        
        });
        
        function checkHandsUp(pose,roomID,name) {
            let nosey = pose.nose.y
            let nosec = pose.nose.confidence
        
            let leftwristy = pose.leftWrist.y
            let leftwristc = pose.leftWrist.confidence
        
            let rightwristy = pose.rightWrist.y
            let rightwristc = pose.rightWrist.confidence
        
            if(nosec < 0.50 || (rightwristc < 0.50 && leftwristc < 0.50)){
                // console.log("bad c")
                return
            }
        
            if(leftwristy < nosey || rightwristy < nosey){
                socket.emit("hand",roomID,name)
                // console.log("raised")
                return
            }
        
            // console.log('waiting')
        }

    }

    render(){

        if(this.props.location.state == undefined){
            return <Redirect to={{ pathname: '/join' }} />
        }

        const gridStyle = { width: '50%', textAlign: 'center', borderRadius:'15px' };

        const {roomID, name} = this.props.location.state.values;

        const welcomeTitle = "Welcome to Room " + roomID + ", " + name;

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

                <Card title={<h1>{welcomeTitle}</h1>} extra={<div><video id="video" width="160" height="120" autoPlay></video></div>} bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '5%', marginRight:'5%'}}>
                    <Card.Grid style={{ width: '50%', textAlign: 'center', borderRadius:'15px' }}>
                        <canvas id="whiteboard" width={380} height={600}></canvas>
                    </Card.Grid>
                    <Card.Grid style={{ width: '50%', textAlign: 'center', borderRadius:'15px' }}>
                        {(this.state.socket !== null) ? <Chatroom name={name} socket={this.state.socket} roomID={roomID} /> : <Spin indicator={antIcon} />}
                    </Card.Grid>
                </Card>

              </section>

            </div>

        )
    }
}

export default withRouter(StudentDashboard);