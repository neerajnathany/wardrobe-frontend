import React, { Component } from 'react';

class Group extends Component {
	render() {
		var group = this.props.group;
		return (
			<div className="group">
				<h5 className="group-title">{group}</h5>
				{this.props.clothes.filter(each => {
					return (each.category === group)
				}).sort((a,b) => {
					return b.fitting - a.fitting
				}).map(each => {
					return (
					<div className="cloth" key={String(each._id)}>
						<div className="cloth-tile" style={{backgroundColor: each.color.pHex}}></div>
						<span className="cloth-form">{each.form}</span>
						<span className="cloth-name">{each.brand}</span>
					</div>)
				})}
			</div>
		);
	}
}

export default Group;