import React, { Component } from 'react';

import { Comment, Avatar, Form, Button, List, Input, Empty ,Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Text} = Typography

const CommentList = ({ comments }) => (
    <div>
        <h2>Chatroom</h2>
        <List
            dataSource={comments}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
            style={{overflowY:'scroll', height: '50vh', marginBottom: '10%'}}
        />
    </div>
    
);

const Editor = ({ onChange, onSubmit, submitting, value, disableChat }) => (
    <div>
        <Form.Item>
        <Input onChange={onChange} value={value} disabled={disableChat}/>
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
        </Button>
        </Form.Item>
    </div>
);

class Chatroom extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
            disableChat: true
        }
    }

    componentDidMount(){
        const myName = this.props.name;
        const socket = this.props.socket;
        socket.on("newMessage", (name, message) => {
            if(name !== myName){
                this.setState({
                    comments: [
                        {
                        author: name,
                        content: <p>{message}</p>,
                        datetime: moment().format('LLLL'),
                        },
                        ...this.state.comments,
                    ]
                })
            }
        }) 

        socket.on("hand", (name) => {
            if(name === myName){
                clearTimeout();
                this.setState({
                    disableChat: false
                })

                setTimeout(() => {
                    this.setState({
                        disableChat: true
                    });
                }, 30000);
            }
        }) 
    }

    handleSubmit = () => {
        const { name, socket, roomID } = this.props;

        socket.emit("sentComment",roomID,name,this.state.value)

        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        const question = {
            question: this.state.value
        }

        axios.post('/classes/updateQuestion/' + this.props.roomID, question)
        .then(res=> {
            console.log(question)
            console.log('success')
        })

        setTimeout(() => {
            this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                author: this.props.name,
                content: <p>{this.state.value}</p>,
                datetime: moment().format('LLLL'),
                },
                ...this.state.comments,
            ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render(){
        const { comments, submitting, value } = this.state;
        return (
            <div>
                {<CommentList comments={comments} />}
                <div>
                    <Text type = {this.state.disableChat ? "warning":'success'}>{this.state.disableChat ? "Please raise your hand to comment":"Commenting enabled!"}</Text>
                    
                </div>
                <Comment
                author={this.props.name}
                content={
                    <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                    disableChat={this.state.disableChat}
                    />
                }
                />
            </div>
        );
    }
}

export default Chatroom;