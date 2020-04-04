import React, { Component } from 'react';
import {withRouter} from "react-router-dom"
import uniqid from 'uniqid'
import io from 'socket.io-client'


class LecturerDashboard extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const id = uniqid()
        console.log(id)
        const socket = io("http://localhost:5000/");
        socket.emit("joinroom",id)
        socket.on("hand",(arg)=>{
            console.log(arg+' raised hand')
        })
        socket.on("joinnotif",(arg)=>{
            console.log(arg+" joined")
        })
        
    }

    render(){
        return(

            <div>
                <h1>Welcome Lecturer</h1>
                <h1></h1>
            </div>
            
        )
    }
}

export default withRouter(LecturerDashboard);