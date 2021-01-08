import React, { Component } from 'react';
import Link from './components/Link';

class Home extends Component {
	render() {
		return (
			<main className="home">
				<div className="home-header">
					<span className="home-name">Cobalt</span>
					<h1 className="home-title">The complete <span className="home-highlight">wardrobe manager</span> is here🎉</h1>
				</div>
				<Link className="home-cta" href='/clothes'>Sign in</Link>
				<h5 className="home-ps">Please do refresh the next page a few times to spin up the dynos & see the results.</h5>
			</main>
		);
	}
}

export default Home;