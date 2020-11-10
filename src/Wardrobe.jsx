import React, { Component } from 'react';
import ItemView from './components/ItemView';
import Link from './components/Link';
import Clothes from './views/Clothes';
import axios from 'axios';

class Wardrobe extends Component {
    
    constructor(props){
        super(props);
        this.state = { clothes: this.getClothes(), footwear:[], selectedItem: null, test: 'test' };
    }

    componentDidMount(){
        console.log(this.state.clothes);
    }

    getClothes = async () => {
        const response = await axios.create({baseURL: 'http://localhost:5000',}).get('/wardrobe');
        return response.data.clothes.filter(e => {return !e.tags.includes('Pseudo Discard')});
        // this.setState({ clothes: response.data.clothes.filter(e => {return !e.tags.includes('Pseudo Discard')})});
        // this.setState({test: 'how about'});
    };

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
            <Clothes clothes={this.state.clothes} showItem={this.showItem} test={this.state.test}/>
            {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearItem}/> : <ItemView class="inactive"/>}
        </div>
        );
    }
}
 
export default Wardrobe;
