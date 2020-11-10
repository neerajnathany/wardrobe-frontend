import React, { Component } from 'react';
import Link from './Link';

class ViewSelector extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <button><Link href="/clothes">Clothes</Link></button>
                <button><Link href="/footwear">Footwear</Link></button>
            </div>
         );
    }
}
 
export default ViewSelector;