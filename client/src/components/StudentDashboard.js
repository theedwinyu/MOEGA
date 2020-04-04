import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import io from 'socket.io-client'
import ml5 from 'ml5'

class StudentDashboard extends Component{

    constructor(props){
        super(props);
    }

    async componentDidMount(){
        const socket = io("http://localhost:5000/");
        socket.emit("joinroom",this.props.location.state.values.roomID)
        socket.emit("joinnotif",this.props.location.state.values.roomID,this.props.location.state.values.name)
        const video = document.getElementById('video')
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(function (stream) {
                video.srcObject = stream;
                video.play();
              })
              .catch(function (err0r) {
                console.log(err0r);
            });
        }

        const poseNet = ml5.poseNet(video,"single", modelLoaded);
        function modelLoaded() {
            console.log('Model Loaded!');
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
                console.log("bad c")
                return
            }
        
            if(leftwristy < nosey || rightwristy < nosey){
                socket.emit("hand",roomID,name)
                console.log("raised")
                return
            }
        
            console.log('waiting')
        }

    }

    render(){
        console.log(this.props.location.state);
        return(

            <div>
                <video id="video" width="640" height="480" autoPlay></video>
                <h1>Room {this.props.location.state.values.roomID}</h1>
                <h1>Welcome {this.props.location.state.values.name}</h1>
            </div>
            
        )
    }
}

export default withRouter(StudentDashboard);