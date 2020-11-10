import React, { Component } from 'react';
import Notification from './components/Notification';
import ViewSelector from './components/ViewSelector';
import Clothes from './views/Clothes';
import Footwear from './views/Footwear';
import Link from './components/Link';
import ItemView from './components/ItemView';

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
                <Notification  />
                <span className="header-user">Neeraj Nathany</span>
            </header>
            <ViewSelector view={this.props.view} />
            {this.props.view == 'clothes' ? 
            <Clothes showItem={this.showItem} view={this.props.view}/> :
            <Footwear showItem={this.showItem} view={this.props.view}/>}
            {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearItem}/> : <ItemView class="inactive"/>}
        </div>
        );
    }
}
 
export default Wardrobe;
