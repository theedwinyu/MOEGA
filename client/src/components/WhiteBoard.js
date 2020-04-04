import React, { useState, useRef } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
// import "./style/WhiteBoard.css";
import { Stage, Layer } from "react-konva";
import { addLine } from "./Line";

function WhiteBoardPage() {
	const stage = React.createRef();
	const layer = React.createRef();

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
				<Button variant="secondary" onClick={drawLine}>
					Line
				</Button>
				<Button variant="secondary" onClick={eraseLine}>
					Erase
				</Button>
			</ButtonGroup>
			<Stage
				width={window.innerWidth * 0.9}
				height={window.innerHeight - 150}
				ref={stage}
			>
				<Layer ref={layer}>

				</Layer>
			</Stage>
		</div>
	);
}

export default WhiteBoardPage;