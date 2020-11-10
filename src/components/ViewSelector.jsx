import React, { Component } from 'react';
import Link from './Link';
import Icon from './Icon';

class ViewSelector extends Component {
    render() { 
        return ( 
            <div className="view-box">
                <Link href="/clothes" className={"view-button " + (this.props.view == 'clothes' ? 'true' : 'false')}>
                    {/* <Icon form="clothes"/> */}
                    Clothes
                </Link>
                <Link href="/footwear" className={"view-button " + (this.props.view == 'footwear' ? 'true' : 'false')}>
                    {/* <Icon form="footwear"/> */}
                    Footwear
                </Link>
            </div>
         );
    }
}
 
export default ViewSelector;