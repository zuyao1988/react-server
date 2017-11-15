import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

//Class for helper
class Header extends Component {
	renderContent() {
		console.log(this.props);
		switch (this.props.auth) {
			case null:
				return;
			case false:
				console.log('...');
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return [
					<li key={1}>
						<Payments />
					</li>,
					<li key={3} style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key={2}>
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
						style={{ margin: '0 0 0 5px' }}
					>
						Avva-nest
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
