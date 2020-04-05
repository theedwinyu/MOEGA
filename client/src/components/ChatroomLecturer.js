import React, { Component } from 'react';

import { Comment, Avatar, Form, Button, List, Input, Empty } from 'antd';
import moment from 'moment';

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

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
        <Input onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
        </Button>
        </Form.Item>
    </div>
);

class ChatroomLecturer extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: ''
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
                <Comment
                author={this.props.name}
                content={
                    <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                    />
                }
                />
            </div>
        );
    }
}

export default ChatroomLecturer;