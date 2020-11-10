import React, { Component } from 'react';
import Group from '../components/Group';
import Empty from '../components/Empty';
import {age, fCats} from '../constants';
import axios from 'axios';

class Footwear extends Component {
    
    state = { clothes: [], fClothes: [], categories: [], tags: [], tagFilters: [], ageFilter: '', formFilter: ''}

    componentDidMount(){
        this.getClothes();
    }
    
    getClothes = async () => {
        const response = await axios.create({baseURL: 'http://localhost:5000',}).get('/wardrobe');
        this.setState({ clothes: response.data.footwear.filter(e => {return !e.tags.includes('Pseudo Discard')})});
        this.setState({ fClothes: this.state.clothes});
        this.getCategories();
        this.getTags();
    };

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
        this.setState({
            tagFilters: !this.state.tagFilters.includes(e.currentTarget.value) ? 
            [...this.state.tagFilters, e.currentTarget.value] : this.state.tagFilters.filter(each => {return each !== e.currentTarget.value})
        }, () => {
            this.setFilterClothes();
        })       
    }

    onStdFilter = (e) => {
        var filterName = e.currentTarget.dataset.filter + 'Filter';
        this.setState({
            [filterName]: this.state[filterName] !== e.currentTarget.value ? e.currentTarget.value : '' 
        }, () => {
            this.setFilterClothes();
        })
    }

    setFilterClothes = (e) => {
        this.setState({fClothes: this.state.clothes.filter(e=>{
            return (age[e.age].includes(this.state.ageFilter) &&
            (this.state.formFilter ? e.form ? e.form.includes(this.state.formFilter) : false : true) &&
            this.state.tagFilters.every(tag=>{
                return e.tags.includes(tag);
            }));
        })})
    }

    render() { 
        return ( 
            <main className="main">
                <aside className="panel">
                    <div className="panel-head">
                        <h4 className="panel-title">Filters</h4>
                        {Boolean(this.state.tagFilters.length || this.state.ageFilter || this.state.formFilter) && 
                        <button className="panel-extra" onClick={(e)=>this.setState({tagFilters: [], ageFilter: '', formFilter: '', fClothes: this.state.clothes})}>Clear all</button>}
                    </div>
                    <div className="panel-box">
                        {fCats.map((each,num) => {
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
                                        <button className={"panel-button "+ (this.state.formFilter === u)} key={order} onClick={this.onStdFilter} value={u} data-filter="form">
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
                        <h5 className="panel-box-title">Age</h5>
                        {age.map((each,index) => {
                            return(
                                <button className={"panel-button " + (this.state.ageFilter === each)} key={index} onClick={this.onStdFilter} value={each} data-filter="age">
                                    <span>{each}</span>
                                </button>
                            )
                        })}
                    </div>
                </aside>
                <div className="main-content">
                    <div className="main-head">
                        <h2 className="main-title">Footwear</h2>
                        <span className="main-extra">{this.state.fClothes.length} result(s)</span>
                    </div>
                    {this.state.fClothes.length ? (this.state.categories.map( (each, index) => {
                        return (
                            <Group 
                                category={each}
                                key={index}
                                clothes={
                                    this.state.fClothes.filter(e => {
                                        return e.category === each
                                    })
                                }
                                showItem = {this.props.showItem}
                                view = {this.props.view}
                            />
                        )
                    })) : <Empty />}
                </div>
            </main>
         );
    }
}
 
export default Footwear;