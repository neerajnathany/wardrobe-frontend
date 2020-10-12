import React, {Component} from 'react';
import axios from 'axios';

class Notification extends Component {
	state = { temp: '25', desc: 'wind'};
	iconUrl = "http://openweathermap.org/img/wn/";

	componentDidMount(){
		this.getWeather();
	}

	getWeather = async () => {
        const response = await axios.create({
			baseURL: 'http://localhost:5000',
		}).get('/weather');
        this.setState({temp: response.data.temp, desc: response.data.desc, icon: response.data.icon});
    }

	render() { 
		return ( 
			<div className="panel-notif">
				<img className="panel-notif-icon" src={this.iconUrl + this.state.icon + ".png"} alt={this.state.desc}/>
				<span className="panel-notif-text"><b>{Math.round(this.state.temp)}°C</b> with <b>{this.state.desc}</b>. Dress accordingly!</span>
			</div>
		 );
	}
}
 
export default Notification;