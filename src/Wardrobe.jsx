import React, { Component } from 'react';
import ItemView from './components/ItemView';
import Link from './components/Link';
import Clothes from './views/Clothes';

class Wardrobe extends Component {

    state = { selectedItem: null };


    showItem = (item) => {
        this.setState({selectedItem:item});
    }

    clearItem = () => {
        this.setState({selectedItem:null});
    }

    render() { 
        return ( 
        <div className="wardrobe">
            <header className="header">
                <Link className="header-title" href="/">Cobalt</Link>
                <span className="header-user">Neeraj Nathany</span>
            </header>
            <Clothes showItem={this.showItem} test="test"/>
            {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearItem}/> : <ItemView class="inactive"/>}
        </div>
        );
    }
}
 
export default Wardrobe;
