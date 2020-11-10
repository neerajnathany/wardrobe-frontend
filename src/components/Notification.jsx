import React, {Component} from 'react';
import axios from 'axios';

const KEY = 'c9ae2c13187279ee786d6369b8618cb7';
const CITY = 'hyderabad';

class Notification extends Component {
	state = { temp: '25', desc: 'wind'};
	iconUrl = "http://openweathermap.org/img/wn/";

	componentDidMount(){
		this.getWeather();
	}
	
	getWeather = async () => {
        const response = await axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5',
        }).get('/weather',{
            params:{
                q: CITY,
                appid: KEY,
                units: 'metric',
            }
		});
		this.setState({temp: response.data.main.temp, desc: response.data.weather[0].description, icon: response.data.weather[0].icon});
    }

	render() { 
		return ( 
			<div className="header-notif">
				<img className="header-notif-icon" src={this.iconUrl + this.state.icon + ".png"} alt={this.state.desc}/>
				<span className="header-notif-text">Prediction of <b>{Math.round(this.state.temp)}°C</b> with <b>{this.state.desc}</b>. Dress accordingly!</span>
			</div>
		 );
	}
}
 
export default Notification;