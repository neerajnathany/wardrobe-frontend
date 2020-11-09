import React, { Component } from 'react';
import Wardrobe from './Wardrobe';
import Home from './Home';

class App extends Component {
    state = {location:window.location.pathname}

    componentDidMount(){
        const onLocationChange = () => {
            this.setState({location: window.location.pathname});
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }

    showView = () => {
        if (this.state.location === '/'){
            return <Home/>
        }
        else if(this.state.location === '/clothes'){
            return <Wardrobe view="clothes"/>
        }
        else if(this.state.location === '/footwear'){
            return <Wardrobe view="footwear"/>
        }
    }


    render() { 
        return ( 
            <div>{this.showView()}</div>
         )
    }
}
 
export default App;
