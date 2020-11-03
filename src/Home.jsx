import React, { Component } from 'react';
import Link from './components/Link';

class Home extends Component {
	render() {
		return (
			<main className="home">
				<div className="home-header">
					<h1 className="home-title"><span className="home-name">Cobalt</span><br></br>The complete <span className="home-highlight">wardrobe manager</span> is here🎉</h1>
				</div>
				{/* <a className="home-cta" href="/wardrobe">Sign in</a> */}
				<Link className="home-cta" href='/wardrobe'>Sign in</Link>
			</main>
		);
	}
}

export default Home;