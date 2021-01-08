import React, { Component } from 'react';

class Loader extends Component {
    render() { 
        return (
            <div className="empty">
                <div className="empty-box">
                    <div className="loader">Loading...</div>
                    <h4 className="empty-text">Loading your wardrobe, just a second.<br/>Do refresh the page if it takes long.</h4>
                </div>
            </div>
          );
    }
}
 
export default Loader;