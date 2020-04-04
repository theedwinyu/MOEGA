import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import { Card, Button, Form, Input } from 'antd';

class JoinRoom extends Component{

    constructor(){
        super();
        this.state = {
            redirect: false,
            values: {}
        };
    }

    onFinish = values => {
        console.log('Success:', values);
        this.setState({redirect: true, values})
    };

    render(){

        console.log(this.state)
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/student', state: { values: this.state.values } }} />
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
                    <Card title="Join room" bordered={false} style={{ width: 500 }}>
                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Room ID"
                            name="roomID"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Room ID!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </div>
                
            </section>

            
        )
    }
}

export default JoinRoom;