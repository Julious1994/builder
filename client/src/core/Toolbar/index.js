import React, { Component } from 'react';
import Tools from './Tools';
import Accordian, { AccordianItem } from './../../components/Accordian';

class Toolbar extends Component {

	constructor(props) {
		super(props);
		this.state={
			infoPopup: false,
		};
	}

	render() {
		return(
			<div style={{height: '100%', display: 'flex'}}>
				<div style={{ width: '75%', overflow: 'auto' }}>
					<Accordian defaultActive={2}>
						<AccordianItem label="Header"></AccordianItem>
						<AccordianItem label="Footer"></AccordianItem>
						<AccordianItem label="Content">
							<div style={{ height: 100}}>Content1</div>
							<div style={{ height: 150}}>Content2</div>
							<div style={{ height: 150}}>Content3</div>
							<div style={{ height: 100}}>Content4</div>
							<div style={{ height: 150}}>Content5</div>
							<div style={{ height: 150}}>Content6</div>
							<div style={{ height: 100}}>Content7</div>
							<div style={{ height: 150}}>Content8</div>
							<div style={{ height: 150}}>Content9</div>
						</AccordianItem>
					</Accordian>
				</div>
				<div style={{ width: '25%', borderLeft: '1px solid black', height: '100%' }}>
					<Tools />
				</div>
			</div>
		)
	}
}

export default Toolbar;