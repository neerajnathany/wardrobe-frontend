import React, { Component } from 'react';
import ItemView from './components/ItemView';
import Link from './components/Link';
import Clothes from './views/Clothes';
import axios from 'axios';

class Wardrobe extends Component {

    state = { clothes: [], footwear:[], selectedItem: null };

    componentDidMount(){
        this.getClothes();
        // const fetchClothes = async () => {
        //     const response = await fetch("http://localhost:5000/wardrobe");
        //     const { clothes } = await response.json();
        //     this.setState({
        //       clothes
        //     });
        //   };
        //   fetchClothes();
    }

    getClothes = async () => {
        const response = await axios.create({baseURL: 'http://localhost:5000',}).get('/wardrobe');
        this.setState({ clothes: response.data.clothes.filter(e => {return !e.tags.includes('Pseudo Discard')})});
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
            <Clothes clothes={this.state.clothes} showItem={this.showItem} test="test"/>
            {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearItem}/> : <ItemView class="inactive"/>}
        </div>
        );
    }
}
 
export default Wardrobe;
