import React, { Component } from 'react';

class Group extends Component {
		
	render() {
		var category = this.props.category;
		return (
			Boolean(this.props.clothes.length) ?
			<div className={"group " + this.props.class}>
				<h5 className="group-title">{category}</h5>
				{this.props.clothes.sort((a,b) => {
					return b.fitting - a.fitting
				}).map((each,i,self) => {
					return (
						<div className="item" key={String(each._id)}>
							<div className="item-tile" style={{backgroundColor: each.color.pHex}}></div>
							{each.brand ? <span className="item-name">{each.brand}</span> : null}
						</div>
					)
				})}
			</div> : null
		)
	}
}

Group.defaultProps = {
	class : ''
}

export default Group;