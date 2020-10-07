import React, { Component } from 'react';
import Group from './components/Group';
import {length, age, cats} from './constants';
import axios from 'axios';

class App extends Component {

    state = { clothes: [], categories: [], tags: [], fClothes: [], tagFilters: [], lenFilter: '', ageFilter: '', formFilter: '' };

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
        var freq = {};
		var categories = this.state.clothes.map(each => {
			return each.category
		});
		categories.forEach(category => { freq[category] = 0 });
		var uniques = categories.filter(category => {
			return ++freq[category] === 1;
		}).sort((a, b) => {
			return freq[b] - freq[a];
		})
		this.setState({categories: uniques});
    };
    
    getTags = () => {
        var tags = [];
        this.state.clothes.forEach( each => {
            tags = [...tags, ...(each.tags)];
        });
        this.setState({tags: tags.filter((each, index, self) => {
            return self.indexOf(each) === index;
        })});
    }

    onTagFilter = (e) => {
        if (!this.state.tagFilters.includes(e.currentTarget.value)){
            this.setState({tagFilters : [...this.state.tagFilters, e.currentTarget.value]});
        }
        else{
            this.setState({tagFilters : this.state.tagFilters.filter(each => {return each !== e.currentTarget.value})});
        }        
    }

    onLenFilter = (e) => {
        if(this.state.lenFilter !== e.currentTarget.value){
            this.setState({lenFilter: e.currentTarget.value});
        }
        else{
            this.setState({lenFilter: ''});
        }
    }

    onAgeFilter = (e) => {
        if(this.state.ageFilter !== e.currentTarget.value){
            this.setState({ageFilter: e.currentTarget.value});
        }
        else{
            this.setState({ageFilter: ''});
        }
    }

    onFormFilter = (e) => {
        if(this.state.formFilter !== e.currentTarget.value){
            this.setState({formFilter: e.currentTarget.value});
        }
        else{
            this.setState({formFilter: ''});
        }
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
                    <div className="panel-head">
                        <h4 className="panel-title">Filters</h4>
                        {Boolean(this.state.tagFilters.length || this.state.lenFilter || this.state.ageFilter || this.state.formFilter) && 
                        <button className="panel-clear" onClick={(e)=>this.setState({tagFilters: [], lenFilter: '', ageFilter: '', formFilter: ''})}>Clear all</button>}
                    </div>
                    <div className="panel-box">
                        {cats.map((each,num) => {
                            return (
                                <div className="panel-box-group" key={num}><h6 className="panel-box-title">{each}</h6>
                                {this.state.clothes.filter(i=>{
                                    return i.category === each;
                                }).map(c=>{
                                    return c.form
                                }).filter((f, index, self)=>{
                                    return self.indexOf(f) === index;
                                }).map((u,order) => {
                                    return (
                                        <button className={"panel-button "+ (this.state.formFilter === u)} key={order} onClick={this.onFormFilter} value={u}>
                                            <span>{u}</span>
                                        </button>
                                    )
                                })}</div>
                            )
                        })
                        }
                    </div>
                    <div className="panel-box">
                        <h5 className="panel-box-title">Tags</h5>
                        {this.state.tags.map((each, index) => {
                            return (
                                <button className={"panel-button " + this.state.tagFilters.includes(each)} key={index} onClick={this.onTagFilter} value={each}>
                                    <span>{each}</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="panel-box">
                        <h5 className="panel-box-title">Lengths</h5>
                        {length.map((each, index) => {
                            return (
                                <button className={"panel-button " + (this.state.lenFilter === each)} key={index} onClick={this.onLenFilter} value={each}>
                                    <span>{each}</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="panel-box">
                        <h5 className="panel-box-title">Age</h5>
                        {age.map((each,index) => {
                            return(
                                <button className={"panel-button " + (this.state.ageFilter === each)} key={index} onClick={this.onAgeFilter} value={each}>
                                    <span>{each}</span>
                                </button>
                            )
                        })}
                    </div>
                </aside>
                <div className="main-content">
                <h2 className="main-title">My Wardrobe ({this.state.fClothes.length})</h2>
                    {this.state.categories.map( (each, index) => {
                        return (
                            <Group 
                                category={each}
                                key={index}
                                clothes={
                                    this.state.fClothes.filter(e => {
                                        return (
                                            e.category === each && 
                                            this.state.tagFilters.every(tag=>{
                                                return e.tags.includes(tag);
                                            }) &&
                                            length[e.length].includes(this.state.lenFilter) &&
                                            age[e.age].includes(this.state.ageFilter) &&
                                            (this.state.formFilter ? e.form ? e.form.includes(this.state.formFilter) : false : true)
                                        )
                                    })
                                }
                            />
                        )
                    })}
                    {/* 
                        <Group category="Discards" class="off" clothes={this.state.clothes.filter(e => {
                                return e.tags.includes('Pseudo Discard')
                            })}
                        />
                    */}
                </div>
            </div>
        </div>
        );
    }
}
 
export default App;
