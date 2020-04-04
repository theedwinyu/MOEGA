import React, { Component } from 'react';
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
              </section>
            </div>

           
            
        )
    }
}

export default withRouter(StudentDashboard);