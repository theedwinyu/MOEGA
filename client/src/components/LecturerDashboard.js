import React, { Component } from 'react';
import {withRouter} from "react-router-dom"

class LecturerDashboard extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

            <div>
                <h1>Welcome Lecturer</h1>
            </div>
            
        )
    }
}

export default withRouter(LecturerDashboard);