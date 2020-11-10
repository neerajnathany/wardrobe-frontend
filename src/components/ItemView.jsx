import React, { Component } from 'react';
import {length, age} from '../constants';

class ItemView extends Component {
    render() {
        var item = this.props.item;
        return (
            <div className={"pop-box " + this.props.class} onClick={this.props.clearItem}>
                {item ? 
                    (<div className="pop-item">
                        <div className="pop-item-tile" style={{backgroundColor: item.color.pHex}}></div>
                        <div className="pop-item-detail">
                            <div className="pop-item-desc">
                                <h5 className="pop-item-title"><span>Details</span></h5>
                                <table className="pop-item-table">
                                    <tbody>
                                        <tr><td>Category:</td><td>{item.category}</td></tr>
                                        {item.form ? <tr><td>Type:</td><td>{item.form}</td></tr> : null}
                                        {item.brand? <tr><td>Brand:</td><td>{item.brand}</td></tr>: null}
                                        {item.particulars? <tr><td>Particulars:</td><td>{item.particulars}</td></tr>: null}
                                        {item.collar ? <tr><td>Collar:</td><td>{item.collar}</td></tr> : null}
                                        {item.length? <tr><td>Length:</td><td>{length[item.length]}</td></tr>: null}
                                        <tr><td>Age:</td><td>{age[item.age]}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="pop-item-personal">
                                <h5 className="pop-item-title"><span>For me</span></h5>
                                <table className="pop-item-table">
                                    <tbody>
                                        <tr><td>Fitting:</td><td>{item.fitting}</td></tr>
                                        <tr><td>Tags:</td><td>{item.tags.join(", ")}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>) : null
                }
            </div>
          );
    }
}

ItemView.defaultProps = {
	class : ''
}
 
export default ItemView;