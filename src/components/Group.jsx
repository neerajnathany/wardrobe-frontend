import React, { Component } from 'react';

class Group extends Component {
		
	render() {
		var category = this.props.category;
		return (
			Boolean(this.props.clothes.length) ?
			<div className={"group " + this.props.class}>
				<h5 className="group-title">{category}</h5>
				<div>
					{this.props.clothes.sort((a,b) => {
						return b.fitting - a.fitting
					}).map((each,i,self) => {
						return (
							<div className={"item " + (this.props.view == 'clothes' ? 'small':'big')} key={String(each._id)} onClick = {() => this.props.showItem(each)}>
								<div className="item-tile" style={this.props.view == 'clothes' ? {backgroundColor: each.color.pHex}: null}>
									{each.image ? <img src={each.image}></img> : null}
								</div>
								{each.brand ? <span className="item-name">{each.brand}</span> : null}
							</div>
						)
					})}
				</div>
			</div> : null
		)
	}
}

Group.defaultProps = {
	class : ''
}

export default Group;