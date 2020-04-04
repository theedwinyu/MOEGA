import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import io from 'socket.io-client'
import ml5 from 'ml5'
import {Redirect, withRouter} from "react-router-dom"
import {Card} from 'antd';

import { Comment, Avatar, Form, Button, List, Input } from 'antd';

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
  );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
        </Button>
        </Form.Item>
    </div>
  );

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

        if(this.props.location.state == undefined){
            return <Redirect to={{ pathname: '/join' }} />
        }

        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };

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

                <Card title={welcomeTitle} bordered={true} style={{ backgroundColor:'white', borderRadius:'15px', marginLeft: '5%', marginRight:'5%'}}>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                    <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>

                <div>
                  <video id="video" width="640" height="480" autoPlay></video>
                  <h1>Room {this.props.location.state.values.roomID}</h1>
                  <h1>Welcome {this.props.location.state.values.name}</h1>
                </div>
              </section>

            </div>

        )
    }
}

export default withRouter(StudentDashboard);