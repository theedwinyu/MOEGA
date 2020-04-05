import React, { useState, useRef, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
// import "./style/WhiteBoard.css";
import { Stage, Layer } from "react-konva";
import { addLine } from "./Line";

function WhiteBoardPage(props) {
	const stage = React.createRef();
	const layer = React.createRef();
	var prev = null

	useEffect(()=>{
		setInterval(()=>{
			let current = stage.current.getStage().toDataURL()
			if(prev != current){
				console.log("diff!")
				props.socket.emit("whiteboardUpdate",props.roomID,stage.current.getStage().toDataURL())
			}
			prev = current
		},1000)
	})
	const drawLine = () => {
		addLine(stage.current.getStage(), layer.current);
    };
    
	const eraseLine = () => {
		addLine(stage.current.getStage(), layer.current, "erase");
	};

	return (
		<div className="home-page">
			<h1>WhiteBoard</h1>
			<ButtonGroup>
				<Button variant="outline-primary" onClick={drawLine}>
					Line
				</Button>{' '}
				<Button variant="outline-primary" onClick={eraseLine}>
					Erase
				</Button>
			</ButtonGroup>
			<Stage
				width={380}
				height={600}
				ref={stage}
			>
				<Layer ref={layer}>

				</Layer>
			</Stage>
		</div>
	);
}

export default WhiteBoardPage;