import React, { Component } from 'react';

class Filter extends Component {
    render() { 
        return ( 
        <div>
            {
                this.props.filter.map((each, index) => {
                    return <button className={"panel-button"} key={index}><span>{each}</span></button>
                }) 
            }

        </div> );
    }
}
 
export default Filter;