import React, { Component } from 'react';
import Group from './components/Group';
import axios from 'axios';

class App extends Component {

    state = { clothes: [], categories: [] };

    componentDidMount(){
        this.getList();
    }

    getList = async () => {
        const response = await axios.create({
			baseURL: 'http://localhost:5000',
        }).get('/');
        console.log(response.data);
        this.setState({clothes:response.data});
        this.getCategories();
    }

    getCategories = () => {
		var categories = this.state.clothes.map(each => {
			return each.category
		});
		var freq = {};
		categories.forEach(category => { freq[category] = 0 });
		var uniques = categories.filter(category => {
			return ++freq[category] === 1;
		})
		uniques.sort((a, b) => {
			return freq[b] - freq[a];
		})
		this.setState({ categories: uniques });
	};

    render() { 
        return ( 
            <div className="App">
            <header className="header">
                <span className="header-title">Cobalt</span>
                <span className="header-user">Neeraj Nathany</span>
            </header>
            <div className="main">
                <aside className="panel">
                    <h6 className="panel-title">View by</h6>
                    <button className={"panel-button "}>
                    </button>
                    <button className={"panel-button "}>
                    </button>
                </aside>
                <div className="main-content">
                    <h2 className="main-title">Your Wardrobe</h2>
                    {this.state.categories.map( each => {
                        return (<Group group={each} clothes={this.state.clothes} />)
                    })}
                </div>
            </div>
        </div>
        );
    }
}
 
export default App;
