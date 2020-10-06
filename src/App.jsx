import React, { Component } from 'react';
import Group from './components/Group';
import Filter from './components/Filter';
import {length, collar, age} from './constants';
import axios from 'axios';

class App extends Component {

    state = { clothes: [], categories: [], tags: [], fClothes: [], tagFilters: [] };
    filters = [length, age];
    
    componentDidMount(){
        this.getList();
    }

    getList = async () => {
        const response = await axios.create({
			baseURL: 'http://localhost:5000',
        }).get('/');
        this.setState({ clothes: response.data});
        this.setState({ fClothes: this.state.clothes.filter(e => {return !e.tags.includes('Pseudo Discard')})});
        this.getCategories();
        this.getTags();
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
    
    getTags = () => {
        var tags = [];
        this.state.clothes.forEach( each => {
            tags = tags.concat(each.tags)
        });
        this.setState({tags: tags.filter((each, index, self) => {
            return self.indexOf(each) === index;
        })});
    }

    onTagFilter = (e) => {
        // e.currentTarget.classList.toggle('active');
        // var fClothes = this.state.fClothes.filter(each => {
        //     return each.tags.includes(e.currentTarget.value);
        // })
        // this.setState({fClothes: fClothes});

        if (!this.state.tagFilters.includes(e.currentTarget.value)){
            this.setState({tagFilters : [...this.state.tagFilters, e.currentTarget.value]});
        }
        else{
            this.setState({tagFilters : this.state.tagFilters.filter(each => {return each !== e.currentTarget.value})});
        }
        // this.setState({fClothes: this.state.fClothes.filter(each => {
        //     return this.state.tagFilters.every(tag=>{
        //         return each.tags.includes(tag);
        //     });
        // })});
        //console.log(this.state.fClothes);
        
    }

    render() { 
        return ( 
            <div className="App">
            <header className="header">
                <span className="header-title">Cobalt</span>
                <span className="header-user">Neeraj Nathany</span>
            </header>
            <div className="main">
                <aside className="panel">
                    <h4 className="panel-title">Filters</h4>
                    {this.state.tags.map((each, index) => {
                            return (
                                <button className={"panel-button " + this.state.tagFilters.includes(each)} key={index} onClick={this.onTagFilter} value={each}>
                                    <span>{each}</span>
                                </button>
                            )
                        })
                    }
                    {this.filters.map((each, index) => {
                            return <Filter filter={each} key={index}/>
                        })
                    }
                </aside>
                <div className="main-content">
                    <h2 className="main-title">Your Wardrobe</h2>
                    {this.state.categories.map( (each, index) => {
                        return (
                            <Group 
                                category={each}
                                key={index}
                                clothes={
                                    this.state.fClothes.filter(e => {
                                        return (e.category === each && this.state.tagFilters.every(tag=>{
                                            return e.tags.includes(tag);
                                        }))
                                    })
                                }
                            />
                        )
                    })}
                </div>
            </div>
        </div>
        );
    }
}
 
export default App;
