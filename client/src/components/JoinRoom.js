import React, { Component } from 'react';
import {Redirect,withRouter} from "react-router-dom";
import { Card, Button, Form, Input } from 'antd';

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

class JoinRoom extends Component{

    constructor(){
        super();
        this.state = {
            redirect: false,
            values: {}
        };
    }

    onFinish = values => {
        this.setState({redirect: true, values})
    };

    render(){

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

                <div className="App-temp">
                    <Card title="Join room" bordered={true} style={{ width: 500, borderRadius:'15px'}}>
                    <Form {...layout}
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

                        <Form.Item {...tailLayout}>
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

export default withRouter(JoinRoom);