import React, { Component } from 'react';
import {withRouter} from "react-router-dom"

class StudentDashboard extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.location.state);
        return(

            <div>
                <h1>Room {this.props.location.state.values.roomID}</h1>
                <h1>Welcome {this.props.location.state.values.name}</h1>
            </div>
            
        )
    }
}

export default withRouter(StudentDashboard);