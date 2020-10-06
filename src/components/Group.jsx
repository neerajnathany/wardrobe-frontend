import React, { Component } from 'react';

class Group extends Component {
		
	render() {
		var category = this.props.category;
		return (
			Boolean(this.props.clothes.length) ?
		<div className="group">
			<h5 className="group-title">{category}</h5>
			{this.props.clothes.sort((a,b) => {
				return b.fitting - a.fitting
			}).map((each,i,self) => {
				return (
					<div className="item" key={String(each._id)}>
						<div className="item-tile" style={{backgroundColor: each.color.pHex}}></div>
						{/* <span className="item-form">{each.form}</span> */}
						<span className="item-name">{each.brand}</span>
					</div>
				)
			})}
		</div> : null
		)
	}
}

export default Group;